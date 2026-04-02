/**
 * video-review-agent — Analisador de Reel via Gemini File API (Google AI Studio)
 * Uso: node analyze-video.js <caminho-do-video>
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyB2ldwoSpGxon--EK75lohgFWnuZzUU1jE';
const OUTPUT_DIR = path.join(__dirname, '../data/reels-referencia');

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString() }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function uploadVideo(videoPath) {
  const videoBuffer = fs.readFileSync(videoPath);
  const mimeType = 'video/mp4';
  const displayName = path.basename(videoPath);

  console.log('📤 Iniciando upload para Gemini File API...');

  // Step 1: Iniciar upload resumable
  const initRes = await httpsRequest({
    hostname: 'generativelanguage.googleapis.com',
    path: `/upload/v1beta/files?uploadType=resumable&key=${API_KEY}`,
    method: 'POST',
    headers: {
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': videoBuffer.length,
      'X-Goog-Upload-Header-Content-Type': mimeType,
      'Content-Type': 'application/json',
    }
  }, JSON.stringify({ file: { display_name: displayName } }));

  // A upload URL vem no header X-Goog-Upload-URL
  const uploadUrl = initRes.headers['x-goog-upload-url'] ||
    (() => { throw new Error(`Upload URL não encontrada. Headers: ${JSON.stringify(initRes.headers)} Body: ${initRes.body.substring(0, 300)}`); })();

  // Step 2: Fazer upload do arquivo
  console.log('📦 Enviando bytes do vídeo...');
  const uploadUrlObj = new URL(uploadUrl);
  const uploadRes = await httpsRequest({
    hostname: uploadUrlObj.hostname,
    path: uploadUrlObj.pathname + uploadUrlObj.search,
    method: 'POST',
    headers: {
      'Content-Length': videoBuffer.length,
      'Content-Type': mimeType,
      'X-Goog-Upload-Command': 'upload, finalize',
      'X-Goog-Upload-Offset': 0,
    }
  }, videoBuffer);

  const fileInfo = JSON.parse(uploadRes.body);
  const fileUri = fileInfo?.file?.uri;
  const fileName = fileInfo?.file?.name;

  if (!fileUri) throw new Error(`URI não retornado: ${uploadRes.body.substring(0, 300)}`);
  console.log(`✅ Upload concluído: ${fileName}`);
  return { fileUri, fileName };
}

async function waitForFileActive(fileName) {
  console.log('⏳ Aguardando processamento do arquivo...');
  for (let i = 0; i < 20; i++) {
    const res = await httpsRequest({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/${fileName}?key=${API_KEY}`,
      method: 'GET'
    });
    const info = JSON.parse(res.body);
    if (info?.state === 'ACTIVE') { console.log('✅ Arquivo ativo'); return; }
    if (info?.state === 'FAILED') throw new Error('Processamento falhou');
    await new Promise(r => setTimeout(r, 3000));
  }
  throw new Error('Timeout aguardando arquivo ficar ativo');
}

async function analyzeVideo(fileUri) {
  const prompt = `Você é um especialista em análise de Reels para Instagram.
Analise este vídeo de Reel em detalhes e gere um relatório estruturado em português (PT-BR).

CONTEXTO FORNECIDO PELO CRIADOR:
- As legendas no vídeo são INTENCIONALMENTE DIFERENTES do áudio falado (estilo desejado — legendas têm vida própria)
- Há animações de ENTRADA e SAÍDA adicionadas manualmente no CapCut
- O conteúdo foi criado de forma intuitiva, sem pipeline estruturado

ANALISE E REPORTE OBRIGATORIAMENTE:

## 1. Estrutura
- Quantas cenas/cortes distintos
- Duração total estimada
- Duração média por cena
- Sequência narrativa (gancho → desenvolvimento → fechamento?)

## 2. Visual
- Tipo de imagem: animada / foto / ilustração / misto
- Tipo de movimento: animação gerada / câmera / zoom / estático
- Paleta de cores predominante
- Elementos visuais recorrentes

## 3. Legenda × Áudio
- Como as legendas se relacionam com o que é falado: sincrônicas / independentes / complementares
- Estilo visual das legendas: fonte, cor, posição na tela, tamanho
- As legendas adicionam informação extra ou apenas reforçam o áudio?
- Timing das legendas em relação ao ritmo do vídeo

## 4. Áudio
- Ritmo e energia da fala (lenta/média/rápida, calma/energética)
- Existe trilha de fundo? Descreva o tipo
- Pausas estratégicas identificadas
- Tom emocional geral do áudio

## 5. Produção
- Descreva a animação de ENTRADA (tipo, duração estimada, efeito visual)
- Descreva a animação de SAÍDA (tipo, duração estimada, efeito visual)
- Outros efeitos visuais ou transições identificadas
- Elementos que claramente requerem edição manual (CapCut ou similar)

## 6. Gancho (primeiros 5 segundos)
- O que aparece nos primeiros 5 segundos?
- Por que prende (ou não prende) o espectador?
- Elemento principal de retenção: visual / legenda / áudio / todos

## 7. Padrões Replicáveis
Para cada elemento, classifique:
✅ AUTOMÁTICO — pode ser feito por agentes de IA no pipeline
✋ MANUAL — requer intervenção humana (CapCut, decisão criativa)
❓ A DEFINIR — possível automatizar futuramente

Liste pelo menos 8 elementos com classificação e instrução de como replicar.

## 8. Recomendações para o Pipeline
Gere recomendações específicas e práticas para:
→ script-agent: como estruturar o roteiro de fala e as legendas independentes
→ video-prompt-agent: padrões visuais para os prompts de imagem e animação no Kling
→ video-assembly-agent: como montar (ritmo, legendas, trilha, transições)

Seja específico e detalhado. Este relatório vai calibrar um pipeline automatizado de criação de Reels.`;

  const body = JSON.stringify({
    contents: [{
      parts: [
        { file_data: { mime_type: 'video/mp4', file_uri: fileUri } },
        { text: prompt }
      ]
    }],
    generationConfig: { maxOutputTokens: 8192, temperature: 0.2 }
  });

  console.log('🧠 Analisando com Gemini 2.0 Flash...');
  const res = await httpsRequest({
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);

  const parsed = JSON.parse(res.body);

  // Suporte a thinking models (multi-part): pegar a primeira part com texto não-vazio
  const parts = parsed?.candidates?.[0]?.content?.parts || [];
  const text = parts
    .filter(p => p.text && p.text.trim().length > 0 && !p.thought)
    .map(p => p.text)
    .join('\n') || parts.find(p => p.text && p.text.trim())?.text;

  if (!text) {
    console.error('❌ Resposta bruta do Gemini:', res.body.substring(0, 1000));
    throw new Error(`Gemini não retornou texto. Status: ${res.status}`);
  }
  return text;
}

async function deleteFile(fileName) {
  await httpsRequest({
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/${fileName}?key=${API_KEY}`,
    method: 'DELETE'
  });
  console.log('🗑️  Arquivo deletado da File API');
}

async function main() {
  const videoPath = process.argv[2];
  if (!videoPath || !fs.existsSync(videoPath)) {
    console.error('Uso: node analyze-video.js <caminho-do-video>');
    process.exit(1);
  }

  const sizeMB = (fs.statSync(videoPath).size / 1024 / 1024).toFixed(1);
  console.log(`🔬 Vídeo: ${path.basename(videoPath)} (${sizeMB}MB)`);

  const { fileUri, fileName } = await uploadVideo(videoPath);
  await waitForFileActive(fileName);
  const analysis = await analyzeVideo(fileUri);
  await deleteFile(fileName);

  const videoName = path.basename(videoPath, path.extname(videoPath));
  const date = new Date().toISOString().split('T')[0];
  const outputPath = path.join(OUTPUT_DIR, `review-${videoName}-${date}.md`);

  const report = `# Análise de Reel — ${videoName}
**Data:** ${date}
**Fonte:** próprio (Felipe)
**Arquivo:** ${path.basename(videoPath)} (${sizeMB}MB)

---

${analysis}
`;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, report, 'utf8');
  console.log(`\n📄 Relatório salvo em:\n${outputPath}`);
}

main().catch(err => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});
