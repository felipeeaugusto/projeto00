/**
 * pdf-agent — Gerador de PDF
 * Bônus 05: 30 Atividades para Fazer em Casa
 * Dra. Julia Resende — O Poder da Rotina
 */

const { chromium } = require('playwright');
const path = require('path');

const OUTPUT_PDF = path.resolve(__dirname, 'bonus-05-30-atividades-casa.pdf');

const SVG_LOGO = `<svg width="60" height="40" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 60 Q10 40 30 20 Q50 0 60 20 Q70 0 90 20 Q110 40 90 60 Q70 80 60 60 Q50 80 30 60Z" fill="none" stroke="white" stroke-width="6" stroke-linejoin="round"/>
  <path d="M45 50 Q30 35 45 22 Q55 12 60 22 Q65 12 75 22 Q90 35 75 50" fill="none" stroke="white" stroke-width="4" stroke-linejoin="round"/>
</svg>`;

const FAIXAS = [
  {
    titulo: 'Faixa 1 — 2 a 4 anos',
    descricao: 'Atividades curtas, sensoriais e com resultado imediato. A atenção é breve — a experiência é o que importa.',
    cor: '#03bb85',
    atividades: [
      { num: 1, titulo: 'Torre de desafio', materiais: 'Potes, caixas, livros — qualquer coisa empilhável', como: 'Empilhem juntos até a torre cair. Recomecem. Vejam quantos andares conseguem.', beneficio: 'Desenvolvimento motor fino, tolerância à frustração, causa e efeito.' },
      { num: 2, titulo: 'Encontre a cor', materiais: 'Nenhum', como: 'Fale uma cor. Peça para ela encontrar 5 coisas dessa cor no cômodo o mais rápido que conseguir. Troquem os papéis.', beneficio: 'Atenção visual, identificação de cores, movimento natural pelo ambiente.' },
      { num: 3, titulo: 'Massinha de farinha', materiais: 'Farinha de trigo, água, sal', como: 'Misturem 2 xícaras de farinha, meia xícara de sal e água aos poucos até dar ponto. Modelem juntos — cobra, bola, bolinho — o que vier.', beneficio: 'Desenvolvimento sensorial, criatividade, concentração.' },
      { num: 4, titulo: 'Caça ao tesouro na sala', materiais: '5 objetos quaisquer da casa', como: 'Esconda 5 objetos enquanto ela não está olhando. Peça para encontrar. Depois ela esconde para você.', beneficio: 'Memória espacial, planejamento, alegria da descoberta.' },
      { num: 5, titulo: 'Dança da estátua', materiais: 'Música (telefone serve)', como: 'Música toca — dança. Música para — congela. Quem se mover quando a música estiver parada recomeça.', beneficio: 'Controle inibitório, coordenação motora, regulação de impulsos.' },
      { num: 6, titulo: 'Desenho com o corpo', materiais: 'Papel (papel de pão serve), lápis ou caneta', como: 'Deite a mão da criança sobre o papel e trace o contorno. Ela colore. Depois faz o mesmo com o pé.', beneficio: 'Consciência corporal, criatividade, coordenação motora.' },
      { num: 7, titulo: 'Espelho humano', materiais: 'Nenhum', como: 'Fique de frente para ela. Um de vocês faz um movimento lento — o outro copia como espelho. Troquem quem lidera.', beneficio: 'Atenção, imitação, conexão olho a olho, controle motor.' },
      { num: 8, titulo: 'Cozinheiro de verdade', materiais: 'Ingredientes de uma receita simples (macarrão, ovos mexidos, vitamina)', como: 'Deixe ela participar do processo — mexer, misturar, montar. Explique cada etapa em voz alta.', beneficio: 'Sequenciamento, matemática informal, senso de competência, autonomia.' },
      { num: 9, titulo: 'Livro de figuras inventado', materiais: 'Papel, lápis ou canetinha', como: 'Cada página tem uma figura simples que você desenha. Ela conta a história. Você escreve o que ela ditar no rodapé.', beneficio: 'Linguagem, imaginação, narrativa, sensação de autoria.' },
      { num: 10, titulo: 'Bolhas de sabão', materiais: 'Detergente, água, canudo ou garfo', como: 'Misturem uma colher de detergente em um copo de água. Soprem com o canudo ou passem o garfo mergulhado.', beneficio: 'Exploração sensorial, controle da respiração, deleite simples.' },
    ]
  },
  {
    titulo: 'Faixa 2 — 5 a 7 anos',
    descricao: 'Atividades com regras, sequências e início de raciocínio lógico. A criança gosta de desafio e de saber que conseguiu.',
    cor: '#028a62',
    atividades: [
      { num: 11, titulo: 'Jogo da memória artesanal', materiais: 'Papel, lápis ou caneta', como: 'Recortem ou dobrem papel em 16 quadradinhos. Em pares, desenhem figuras iguais em dois pedaços cada. Embaralhem e joguem.', beneficio: 'Memória, atenção, concentração, construção de algo do zero.' },
      { num: 12, titulo: 'Obstáculos na sala', materiais: 'Almofadas, cadeiras, cobertores', como: 'Montem juntos um circuito pela sala. Ela passa por baixo da cadeira, pula a almofada, atravessa o corredor de cobertores. Cronometrem.', beneficio: 'Planejamento espacial, motricidade global, criatividade colaborativa.' },
      { num: 13, titulo: 'Receita inventada', materiais: 'Papel, lápis', como: 'Peça para ela criar uma receita de um prato imaginário. Ela dita os ingredientes e o passo a passo. Você anota. Depois ela illustra.', beneficio: 'Linguagem escrita, sequenciamento, imaginação, orgulho de criação.' },
      { num: 14, titulo: 'Reportagem do dia', materiais: 'Nenhum (ou celular como "microfone")', como: 'Ela é a repórter. Você é o entrevistado. Ela pergunta sobre o seu dia. Use perguntas reais — o que mais gostou, o que foi difícil, o que aprendeu.', beneficio: 'Linguagem oral, empatia, habilidade de fazer perguntas, conexão real.' },
      { num: 15, titulo: 'Dobraduras simples', materiais: 'Papel qualquer', como: 'Ensine uma dobradura simples — barquinho, avião, coelho. Façam juntos passo a passo. Depois ela tenta sozinha. Decoram o quarto com o que fizerem.', beneficio: 'Motricidade fina, seguimento de instruções, satisfação com produto final.' },
      { num: 16, titulo: 'Detetive da casa', materiais: 'Papel e lápis', como: 'Ela é a detetive. Você deixa "pistas" espalhadas (bilhetinhos, setas desenhadas) que levam a um "tesouro" — pode ser o lanche, um livro favorito.', beneficio: 'Leitura, sequenciamento lógico, resolução de problemas, entusiasmo.' },
      { num: 17, titulo: 'Construção com caixas', materiais: 'Caixas de papelão, fita, tesoura (com supervisão)', como: 'Com caixas de qualquer tamanho, construam algo — casa para boneco, castelo, robô, carro. O que ela imaginar.', beneficio: 'Criatividade espacial, planejamento, construção colaborativa, orgulho de autoria.' },
      { num: 18, titulo: 'Dicionário ilustrado', materiais: 'Papel, lápis', como: 'Escolham 5 palavras juntos. Para cada palavra: ela desenha o que imagina, você explica o significado.', beneficio: 'Vocabulário, associação visual, aprendizagem ativa.' },
      { num: 19, titulo: 'Show de talentos', materiais: 'Nenhum (ou música)', como: 'Ela prepara um "número" — pode ser dança, música, mágica inventada, piada, ginástica. Você é o público. Depois trocam.', beneficio: 'Autoexpressão, confiança, criatividade, prazer na performance.' },
      { num: 20, titulo: 'Horta no copo', materiais: 'Copo, terra, semente (feijão funciona bem)', como: 'Coloquem terra no copo, plantem a semente, reguem com cuidado. Ela é responsável por regar todo dia e observar o que acontece.', beneficio: 'Responsabilidade, observação científica, sequenciamento temporal, paciência.' },
    ]
  },
  {
    titulo: 'Faixa 3 — 8 a 10 anos',
    descricao: 'Atividades com autonomia, raciocínio e criação com propósito. A criança quer ser desafiada e levada a sério.',
    cor: '#016b4d',
    atividades: [
      { num: 21, titulo: 'Mini empresa', materiais: 'Papel, lápis, criatividade', como: 'Ela cria uma "empresa" — o que vai vender, o nome, o logotipo, o preço. Você faz perguntas como cliente: "Por que é bom? Quanto custa? Tem garantia?"', beneficio: 'Pensamento empreendedor, argumentação, criatividade aplicada, autoconfiança.' },
      { num: 22, titulo: 'Podcast em casa', materiais: 'Celular para gravar (opcional)', como: 'Ela escolhe um tema que sabe muito e faz uma "explicação" de 3–5 minutos como se estivesse em um podcast. Pode ser gravado ou não.', beneficio: 'Organização de ideias, comunicação oral, competência, prazer em ensinar.' },
      { num: 23, titulo: 'Jogo de lógica inventado', materiais: 'Papel e lápis', como: 'Juntos, inventem as regras de um jogo novo. Escrevam as regras, joguem, ajustem o que não funcionou.', beneficio: 'Pensamento lógico, colaboração, teste e ajuste, persistência.' },
      { num: 24, titulo: 'Culinária autônoma', materiais: 'Ingredientes de uma receita simples', como: 'Ela prepara sozinha uma receita que já conhece. Você é assistente, não chefe.', beneficio: 'Autonomia, competência, sequenciamento, autoconfiança real.' },
      { num: 25, titulo: 'Mapa da casa', materiais: 'Papel, lápis, régua', como: 'Ela desenha a planta baixa da casa — de cima, como um mapa. Cada cômodo com nome, móveis principais, tamanho proporcional.', beneficio: 'Raciocínio espacial, atenção ao detalhe, planejamento visual, geometria informal.' },
      { num: 26, titulo: 'Debate familiar', materiais: 'Nenhum', como: 'Escolham uma questão sem resposta certa. Cada um defende um lado por 2 minutos, depois trocam de posição e defendem o lado oposto.', beneficio: 'Argumentação, perspectiva, linguagem oral, pensamento crítico.' },
      { num: 27, titulo: 'Diário ilustrado', materiais: 'Qualquer caderno, lápis ou canetas', como: 'Ela escreve (ou desenha) o que aconteceu hoje — não o que foi "correto", mas o que ela realmente sentiu e viveu. Você não lê sem permissão.', beneficio: 'Escrita expressiva, processamento emocional, autonomia, privacidade respeitada.' },
      { num: 28, titulo: 'Fotonovela', materiais: 'Celular para fotos, papel para balões de fala', como: 'Ela cria uma história em quadros usando fotos tiradas em casa. Escreve os diálogos em balões de papel colados nas fotos.', beneficio: 'Narrativa, criatividade visual, sequenciamento, orgulho de produção.' },
      { num: 29, titulo: 'Carta para o futuro', materiais: 'Papel, caneta, envelope', como: 'Ela escreve uma carta para si mesma no futuro — o que quer ter feito, o que quer que não mude, o que está sentindo agora. Fecha no envelope, guardam juntos.', beneficio: 'Autopercepção, planejamento, escrita reflexiva, conexão com a própria identidade.' },
      { num: 30, titulo: 'Exposição de artes', materiais: 'Qualquer trabalho de artes que já fez', como: 'Ela monta uma exposição dos próprios trabalhos. Cria etiquetas com o nome de cada obra, a data e "o que estava sentindo quando fez". Você é o visitante.', beneficio: 'Autopercepção, valorização da própria história, comunicação, senso de identidade.' },
    ]
  }
];

function buildHTML() {
  const faixasHtml = FAIXAS.map((faixa, fi) => {
    const atividadesHtml = faixa.atividades.map(a => `
      <div class="atividade">
        <div class="atividade-header">
          <span class="atividade-num">${a.num}</span>
          <div class="atividade-titulo">${a.titulo}</div>
        </div>
        <div class="atividade-materiais"><strong>Materiais:</strong> ${a.materiais}</div>
        <div class="atividade-bloco">
          <span class="atividade-label">Como fazer:</span>
          <p>${a.como}</p>
        </div>
        <div class="atividade-bloco verde-claro">
          <span class="atividade-label">Benefício:</span>
          <p>${a.beneficio}</p>
        </div>
      </div>
    `).join('');

    return `
      <div class="faixa-section ${fi > 0 ? 'page-break' : ''}">
        <div class="faixa-header">
          <div class="faixa-titulo">${faixa.titulo}</div>
          <div class="faixa-descricao">${faixa.descricao}</div>
        </div>
        <div class="atividades-grid">
          ${atividadesHtml}
        </div>
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Poppins', sans-serif; background: #fff; color: #1A1A1A; }

  /* CAPA */
  .capa {
    width: 210mm; height: 297mm;
    background: #03bb85;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    page-break-after: always;
    padding: 60px 50px;
    text-align: center;
  }
  .capa .logo { margin-bottom: 40px; }
  .capa .badge {
    background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.35);
    border-radius: 20px; padding: 6px 18px; margin-bottom: 28px;
    font-size: 11px; color: rgba(255,255,255,0.9); font-weight: 400; letter-spacing: 1px; text-transform: uppercase;
  }
  .capa h1 { font-size: 38px; font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 16px; }
  .capa .subtitulo { font-size: 16px; font-weight: 400; color: rgba(255,255,255,0.88); margin-bottom: 36px; }
  .capa .linha { width: 60px; height: 2px; background: rgba(255,255,255,0.6); margin: 0 auto 36px; }
  .capa .autora { font-size: 15px; font-weight: 600; color: #fff; }
  .capa .handle { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.75); margin-top: 4px; }

  /* PÁGINAS INTERNAS */
  .pagina {
    width: 210mm;
    padding: 0 0 40px 0;
    page-break-inside: avoid;
  }
  .cabecalho {
    background: #03bb85; height: 50px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 30px; margin-bottom: 30px;
  }
  .cabecalho .logo-cab { display: flex; align-items: center; }
  .cabecalho .titulo-cab { font-size: 11px; font-weight: 400; color: #fff; }
  .rodape {
    border-top: 1px solid #e8f7f2; padding: 12px 30px 0;
    display: flex; justify-content: space-between; align-items: center; margin-top: 30px;
  }
  .rodape .handle-rodape { font-size: 10px; font-weight: 400; color: #03bb85; }
  .rodape .pagina-num { font-size: 10px; font-weight: 400; color: #555; }

  /* SEÇÕES */
  .conteudo { padding: 0 40px; }
  .page-break { page-break-before: always; }

  .faixa-section {}
  .faixa-header {
    background: linear-gradient(135deg, #03bb85 0%, #02a574 100%);
    padding: 20px 40px; margin-bottom: 24px;
  }
  .faixa-titulo { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 6px; }
  .faixa-descricao { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.88); font-style: italic; }

  /* ATIVIDADE CARD */
  .atividades-grid { padding: 0 40px; display: flex; flex-direction: column; gap: 16px; }
  .atividade {
    border: 1px solid #e8f7f2; border-radius: 8px; overflow: hidden;
    page-break-inside: avoid;
  }
  .atividade-header {
    background: #03bb85; padding: 10px 16px;
    display: flex; align-items: center; gap: 14px;
  }
  .atividade-num {
    background: rgba(255,255,255,0.25); color: #fff;
    font-size: 13px; font-weight: 700; width: 28px; height: 28px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .atividade-titulo { font-size: 14px; font-weight: 600; color: #fff; }
  .atividade-materiais {
    background: #f5fdfb; padding: 8px 16px;
    font-size: 12px; color: #555; border-bottom: 1px solid #e8f7f2;
  }
  .atividade-materiais strong { color: #03bb85; font-weight: 600; }
  .atividade-bloco { padding: 10px 16px; border-bottom: 1px solid #e8f7f2; }
  .atividade-bloco:last-child { border-bottom: none; }
  .atividade-bloco.verde-claro { background: #f5fdfb; }
  .atividade-label { font-size: 11px; font-weight: 600; color: #03bb85; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
  .atividade-bloco p { font-size: 12px; font-weight: 400; color: #1A1A1A; line-height: 1.6; }

  /* NOTA */
  .nota-mae {
    margin: 30px 40px 0;
    background: #e8f7f2; border-left: 4px solid #03bb85;
    padding: 20px 24px; border-radius: 0 8px 8px 0;
    page-break-inside: avoid;
  }
  .nota-mae h3 { font-size: 13px; font-weight: 600; color: #03bb85; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .nota-mae p { font-size: 13px; font-weight: 400; color: #1A1A1A; line-height: 1.7; margin-bottom: 10px; }
  .nota-mae .assinatura { font-size: 12px; font-weight: 400; color: #03bb85; font-style: italic; text-align: right; }

  /* CONTRACAPA */
  .contracapa {
    width: 210mm; height: 297mm;
    background: #03bb85;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    page-break-before: always;
    text-align: center;
  }
  .contracapa h2 { font-size: 28px; font-weight: 700; color: #fff; margin: 24px 0 12px; }
  .contracapa .handle { font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.8); }
</style>
</head>
<body>

<!-- CAPA -->
<div class="capa">
  <div class="logo">${SVG_LOGO.replace('width="60"', 'width="80"').replace('height="40"', 'height="54"')}</div>
  <div class="badge">Bônus 05 — O Poder da Rotina</div>
  <h1>30 Atividades para Fazer em Casa</h1>
  <div class="subtitulo">Sem compra, sem saída, sem preparação.<br>Tudo que você precisa já está em casa.</div>
  <div class="linha"></div>
  <div class="autora">Dra. Julia Resende</div>
  <div class="handle">@drjuliaresende</div>
</div>

<!-- COMO USAR -->
<div class="pagina">
  <div class="cabecalho">
    <div class="logo-cab">${SVG_LOGO.replace('width="60"', 'width="36"').replace('height="40"', 'height="24"')}</div>
    <div class="titulo-cab">30 Atividades para Fazer em Casa</div>
  </div>
  <div class="conteudo">
    <h1 style="font-size:22px;font-weight:700;color:#03bb85;margin-bottom:16px;">Como usar este guia</h1>
    <p style="font-size:14px;line-height:1.75;color:#1A1A1A;margin-bottom:16px;">Estas 30 atividades foram organizadas por faixa etária. Nenhuma exige compra, saída de casa ou preparação com antecedência. Tudo que você precisa já está em casa.</p>
    <p style="font-size:14px;line-height:1.75;color:#1A1A1A;">Para os dias em que a pergunta aparecer — <em>"O que a gente faz agora?"</em> — abra nesta página, escolha uma atividade e comece. Em 30 segundos você já tem uma resposta.</p>
  </div>
  <div class="rodape">
    <div class="handle-rodape">@drjuliaresende</div>
    <div class="pagina-num">2</div>
  </div>
</div>

<!-- FAIXAS DE ATIVIDADES -->
${FAIXAS.map((faixa, fi) => {
  const atividadesHtml = faixa.atividades.map(a => `
    <div class="atividade">
      <div class="atividade-header">
        <span class="atividade-num">${a.num}</span>
        <div class="atividade-titulo">${a.titulo}</div>
      </div>
      <div class="atividade-materiais"><strong>Materiais:</strong> ${a.materiais}</div>
      <div class="atividade-bloco">
        <span class="atividade-label">Como fazer:</span>
        <p>${a.como}</p>
      </div>
      <div class="atividade-bloco verde-claro">
        <span class="atividade-label">Benefício:</span>
        <p>${a.beneficio}</p>
      </div>
    </div>
  `).join('');

  const paginaNum = fi === 0 ? 3 : fi === 1 ? 4 : 5;
  const isPageBreak = fi > 0 ? 'page-break-before: always;' : '';

  return `
<div class="pagina" style="${isPageBreak}">
  <div class="cabecalho">
    <div class="logo-cab">${SVG_LOGO.replace('width="60"', 'width="36"').replace('height="40"', 'height="24"')}</div>
    <div class="titulo-cab">30 Atividades para Fazer em Casa</div>
  </div>
  <div class="faixa-header">
    <div class="faixa-titulo">${faixa.titulo}</div>
    <div class="faixa-descricao">${faixa.descricao}</div>
  </div>
  <div class="atividades-grid">
    ${atividadesHtml}
  </div>
  ${fi === 2 ? `
  <div class="nota-mae">
    <h3>Nota para a mãe</h3>
    <p>Nenhuma dessas atividades precisa ser perfeita. O ponto não é o produto — é o processo. A criança que brinca ao lado de um adulto presente está recebendo algo que nenhum aplicativo consegue dar: atenção real, tempo real, você real.</p>
    <div class="assinatura">Dra. Julia Resende · @drjuliaresende</div>
  </div>` : ''}
  <div class="rodape">
    <div class="handle-rodape">@drjuliaresende</div>
    <div class="pagina-num">${paginaNum}</div>
  </div>
</div>`;
}).join('')}

<!-- CONTRACAPA -->
<div class="contracapa">
  ${SVG_LOGO.replace('width="60"', 'width="80"').replace('height="40"', 'height="54"')}
  <h2>O Poder da Rotina</h2>
  <div class="handle">@drjuliaresende</div>
</div>

</body>
</html>`;
}

(async () => {
  const { chromium } = require('playwright');
  console.log('📄 pdf-agent — Bônus 05...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(buildHTML(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  await browser.close();
  const size = (require('fs').statSync(OUTPUT_PDF).size / 1024).toFixed(1);
  console.log(`✅ bonus-05 — ${size} KB`);
})();
