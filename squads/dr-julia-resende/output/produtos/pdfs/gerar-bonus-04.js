/**
 * pdf-agent — Gerador de PDF
 * Bônus 04: Guia de Conexão: 10 Minutos que Mudam o Dia
 * Dra. Julia Resende — O Poder da Rotina
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_PDF = path.resolve(__dirname, 'bonus-04-guia-conexao-10-minutos.pdf');

const PRATICAS = [
  {
    periodo: '☀️ MANHÃ',
    itens: [
      { num: 1, titulo: 'Dois minutos antes de levantar', duracao: '2 minutos', como: 'Antes de checar o celular, antes de pensar na lista do dia — vá até o quarto do seu filho enquanto ele ainda está acordando. Sente na borda da cama por 2 minutos. Não fale sobre o que precisa ser feito. Só esteja ali.', porque: 'O cérebro da criança acorda com o sistema de alerta ativado. A presença calma de um adulto de confiança regula esse sistema antes que o dia comece.' },
      { num: 2, titulo: 'Pergunta de verdade no café da manhã', duracao: '3–5 minutos', como: 'Em vez de "você está pronto?", pergunte uma coisa real: "O que você acha que vai ser a melhor parte do seu dia hoje?" ou "Tem alguma coisa que está te preocupando?" Escute a resposta sem interromper.', porque: 'A criança aprende que você tem interesse no que ela pensa, não só no que ela faz. Isso constrói o hábito de contar as coisas antes que se tornem problemas.' },
      { num: 3, titulo: 'Despedida com contato físico', duracao: '30 segundos', como: 'Na saída para a escola, inclua contato físico intencional — abraço, beijo, aperto de mão, qualquer gesto que seja o "gesto de vocês". Diga o nome dela. "Boa aula, [nome]. A gente se vê hoje."', porque: 'O toque seguro ativa o sistema de apego e sinaliza proteção. A criança sai com o sistema nervoso mais regulado do que sem esse gesto.' },
    ]
  },
  {
    periodo: '🏫 APÓS A ESCOLA / DEPOIS DO TRABALHO',
    itens: [
      { num: 4, titulo: 'Os primeiros 5 minutos são os mais importantes', duracao: '5 minutos', como: 'Quando seu filho chega da escola — ou quando você chega em casa — pause tudo antes de perguntar sobre tarefa, nota ou comportamento. Receba ele primeiro. "Que saudade. Como foi?" Deixe ele contar o que quiser antes de começar a cobrar.', porque: 'A criança passa o dia regulando o comportamento fora de casa. Quando chega, precisa descarregar antes de conseguir ouvir instrução. Os 5 minutos de acolhimento reduzem a resistência do restante da tarde.' },
      { num: 5, titulo: 'Lanche junto (sem tela)', duracao: '10 minutos', como: 'Sentem juntos no lanche. Sem celular na mesa, sem televisão de fundo. Não precisa ser conversa profunda — pode ser sobre o lanche em si, sobre algo que você viu durante o dia, sobre qualquer coisa. O importante é a presença compartilhada.', porque: 'Refeições compartilhadas sem tela são um dos rituais de conexão mais consistentes na pesquisa sobre desenvolvimento infantil. A regularidade desse momento cria sensação de pertencimento.' },
      { num: 6, titulo: 'Brincar no chão por 10 minutos', duracao: '10 minutos', como: 'Desça ao nível dela. Literalmente. No chão, com os brinquedos dela, na brincadeira que ela escolher. Seu papel é seguir a liderança dela — não ensinar, não organizar, não avaliar. Só brincar junto como se você fosse mais um participante.', porque: 'Quando a criança dirige a brincadeira e o adulto segue, ela experimenta controle e competência em um ambiente seguro. Isso reduz ansiedade e aumenta autoconfiança.' },
    ]
  },
  {
    periodo: '🌙 ANTES DE DORMIR',
    itens: [
      { num: 7, titulo: 'A revisão do dia — 3 perguntas', duracao: '5 minutos', como: 'Antes de apagar a luz, faça 3 perguntas na sequência:<br>1. "O que foi a melhor coisa do seu dia hoje?"<br>2. "Teve alguma coisa difícil ou chata?"<br>3. "Tem alguma coisa que você quer que eu saiba?"<br>Escute. Não resolva tudo. Às vezes o que ela precisa é só ser ouvida.', porque: 'A revisão do dia organiza emoções e memórias antes do sono. Crianças que têm esse ritual dormem melhor e desenvolvem mais facilidade para nomear emoções.' },
      { num: 8, titulo: 'A história (ou o silêncio compartilhado)', duracao: '5–10 minutos', como: 'Leia uma história, ou simplesmente deite do lado por alguns minutos em silêncio. Não precisa falar. Não precisa ensinar. Só estar ali enquanto ela adormece.', porque: 'A presença calma de um adulto de confiança no momento de adormecer regula o sistema nervoso e facilita a transição para o sono. Crianças com esse ritual têm menos dificuldade de dormir sozinhas com o tempo.' },
      { num: 9, titulo: 'A frase antes de sair do quarto', duracao: '10 segundos', como: 'Antes de fechar a porta, diga uma variação de: "Eu te amo do jeito que você é. Durma bem." Não como rotina automática — como declaração real, olhando nos olhos.', porque: 'A última coisa que a criança ouve antes de dormir fica. Ela processa emoções durante o sono. Terminar o dia com segurança afetiva muda o tom do processamento noturno.' },
      { num: 10, titulo: 'Toque de boa noite', duracao: '15 segundos', como: 'Um abraço, um beijo na testa, um afago no cabelo. Contato físico real, não apressado. Mesmo que ela já esteja quase dormindo.', porque: 'O toque físico ativa a liberação de ocitocina — o hormônio da conexão. Terminar o dia com toque seguro é um dos gestos mais simples e mais poderosos que existem na parentalidade.' },
    ]
  }
];

function buildHTML() {
  const praticasHtml = PRATICAS.map(p => {
    const itensHtml = p.itens.map(item => `
      <div class="pratica">
        <div class="pratica-header">
          <span class="pratica-num">${item.num}</span>
          <div class="pratica-info">
            <div class="pratica-titulo">${item.titulo}</div>
            <div class="pratica-duracao">⏱ ${item.duracao}</div>
          </div>
        </div>
        <div class="pratica-bloco">
          <span class="pratica-label">Como fazer:</span>
          <p>${item.como}</p>
        </div>
        <div class="pratica-bloco verde-claro">
          <span class="pratica-label">Por que funciona:</span>
          <p>${item.porque}</p>
        </div>
      </div>
    `).join('');
    return `<div class="periodo"><h2>${p.periodo}</h2>${itensHtml}</div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --verde: #03bb85; --branco: #FFFFFF; --escuro: #1A1A1A; --secundario: #555555; --divisor: #e8f7f2; --verde-claro: #f5fdfb; }
body { font-family: 'Poppins', sans-serif; font-size: 13px; color: var(--escuro); background: #FFFFFF; }

.capa { width: 210mm; height: 297mm; background: var(--verde); display: flex; flex-direction: column; align-items: center; justify-content: center; page-break-after: always; padding: 60px 50px; text-align: center; }
.logo-svg { width: 80px; height: 80px; margin-bottom: 40px; }
.capa-label { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.75); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; }
.capa-titulo { font-size: 34px; font-weight: 800; color: var(--branco); line-height: 1.2; margin-bottom: 16px; }
.capa-sub { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.85); margin-bottom: 40px; line-height: 1.6; }
.capa-linha { width: 60px; height: 2px; background: rgba(255,255,255,0.5); margin: 0 auto 40px; }
.capa-nome { font-size: 15px; font-weight: 600; color: var(--branco); margin-bottom: 4px; }
.capa-handle { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.7); }

.header { background: var(--verde); padding: 12px 30px; display: flex; align-items: center; justify-content: space-between; }
.header-logo { font-size: 11px; font-weight: 700; color: var(--branco); letter-spacing: 1px; }
.header-titulo { font-size: 10px; font-weight: 400; color: rgba(255,255,255,0.85); }
.conteudo { padding: 28px 40px 20px; }
.footer { padding: 10px 40px; border-top: 1px solid var(--divisor); display: flex; justify-content: space-between; }
.footer-handle { font-size: 9px; color: var(--verde); }
.footer-pag { font-size: 9px; color: var(--secundario); }

h1 { font-size: 20px; font-weight: 700; color: var(--verde); margin-bottom: 10px; }
h2 { font-size: 13px; font-weight: 700; color: var(--verde); text-transform: uppercase; letter-spacing: 2px; margin: 24px 0 14px; padding-bottom: 6px; border-bottom: 2px solid var(--divisor); }
p { font-size: 12.5px; line-height: 1.7; color: var(--escuro); margin-bottom: 6px; }

.pratica { margin-bottom: 16px; border: 1px solid var(--divisor); border-radius: 6px; overflow: hidden; }
.pratica-header { background: var(--verde); padding: 10px 14px; display: flex; align-items: center; gap: 12px; }
.pratica-num { font-size: 20px; font-weight: 800; color: rgba(255,255,255,0.9); min-width: 28px; }
.pratica-info { flex: 1; }
.pratica-titulo { font-size: 13px; font-weight: 700; color: var(--branco); }
.pratica-duracao { font-size: 10px; font-weight: 300; color: rgba(255,255,255,0.8); margin-top: 2px; }
.pratica-bloco { padding: 10px 14px; }
.pratica-bloco.verde-claro { background: var(--verde-claro); }
.pratica-label { font-size: 10px; font-weight: 700; color: var(--verde); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px; }

.nota { background: var(--verde-claro); border-left: 4px solid var(--verde); padding: 16px 20px; border-radius: 4px; margin-top: 20px; }
.autor-sign { font-style: italic; color: var(--verde); text-align: right; font-size: 12px; margin-top: 20px; }

.contracapa { width: 210mm; height: 297mm; background: var(--verde); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; page-break-before: always; }
.contracapa-produto { font-size: 22px; font-weight: 700; color: var(--branco); margin-bottom: 10px; }
.contracapa-handle { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.75); }
</style>
</head>
<body>

<div class="capa">
  <div class="logo-svg">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFFFFF" d="M50 15 C28 15 12 32 12 50 C12 62 18 72 28 78 L28 68 C22 63 18 57 18 50 C18 35 32 21 50 21 C68 21 82 35 82 50 C82 57 78 63 72 68 L72 78 C82 72 88 62 88 50 C88 32 72 15 50 15Z"/>
      <path fill="#FFFFFF" d="M50 30 C36 30 25 41 25 55 C25 63 29 70 35 75 L35 65 C31 61 29 58 29 55 C29 43 38 34 50 34 C62 34 71 43 71 55 C71 58 69 61 65 65 L65 75 C71 70 75 63 75 55 C75 41 64 30 50 30Z"/>
    </svg>
  </div>
  <div class="capa-label">Bônus 04 — O Poder da Rotina</div>
  <div class="capa-titulo">Guia de Conexão:<br>10 Minutos que<br>Mudam o Dia</div>
  <div class="capa-sub">10 práticas de presença real organizadas<br>por momento do dia</div>
  <div class="capa-linha"></div>
  <div class="capa-nome">Dra. Julia Resende</div>
  <div class="capa-handle">@drjuliaresende</div>
</div>

<div style="page-break-after:always">
  <div class="header"><div class="header-logo">✦ @drjuliaresende</div><div class="header-titulo">Guia de Conexão: 10 Minutos que Mudam o Dia</div></div>
  <div class="conteudo">
    <h1>Por que 10 minutos mudam tudo</h1>
    <p>A criança que não se sente vista vai buscar atenção do jeito que funcionar. Às vezes com birra. Às vezes com choro. Às vezes com o comportamento exato que você mais quer eliminar.</p>
    <p>Não porque ela é difícil. Porque atenção negativa ainda é atenção.</p>
    <p>O que muda com a conexão intencional não é a quantidade de tempo — é a qualidade do sinal que você envia. Quando sua filha ou filho recebe presença real, mesmo que breve, a necessidade de chamar atenção pelo comportamento difícil diminui. Não porque você a treinou. Porque ela se sente segura.</p>
    <p><strong>10 minutos de presença real valem mais do que 3 horas de presença distante.</strong></p>
    <p>Este guia traz práticas organizadas por momento do dia. Você não precisa fazer todas. Escolha as que cabem na sua rotina e faça com consistência.</p>
  </div>
  <div class="footer"><div class="footer-handle">@drjuliaresende</div><div class="footer-pag">1</div></div>
</div>

<div style="page-break-after:always">
  <div class="header"><div class="header-logo">✦ @drjuliaresende</div><div class="header-titulo">Guia de Conexão: 10 Minutos que Mudam o Dia</div></div>
  <div class="conteudo">
    ${PRATICAS[0].itens.map((item, i) => `
    <div class="pratica">
      <div class="pratica-header">
        <span class="pratica-num">${item.num}</span>
        <div class="pratica-info">
          <div class="pratica-titulo">${item.titulo}</div>
          <div class="pratica-duracao">⏱ ${item.duracao}</div>
        </div>
      </div>
      <div class="pratica-bloco"><span class="pratica-label">Como fazer</span><p>${item.como}</p></div>
      <div class="pratica-bloco verde-claro"><span class="pratica-label">Por que funciona</span><p>${item.porque}</p></div>
    </div>`).join('')}
    <h2>${PRATICAS[1].periodo}</h2>
    ${PRATICAS[1].itens.slice(0,1).map(item => `
    <div class="pratica">
      <div class="pratica-header">
        <span class="pratica-num">${item.num}</span>
        <div class="pratica-info">
          <div class="pratica-titulo">${item.titulo}</div>
          <div class="pratica-duracao">⏱ ${item.duracao}</div>
        </div>
      </div>
      <div class="pratica-bloco"><span class="pratica-label">Como fazer</span><p>${item.como}</p></div>
      <div class="pratica-bloco verde-claro"><span class="pratica-label">Por que funciona</span><p>${item.porque}</p></div>
    </div>`).join('')}
  </div>
  <div class="footer"><div class="footer-handle">@drjuliaresende</div><div class="footer-pag">2</div></div>
</div>

<div style="page-break-after:always">
  <div class="header"><div class="header-logo">✦ @drjuliaresende</div><div class="header-titulo">Guia de Conexão: 10 Minutos que Mudam o Dia</div></div>
  <div class="conteudo">
    ${PRATICAS[1].itens.slice(1).map(item => `
    <div class="pratica">
      <div class="pratica-header">
        <span class="pratica-num">${item.num}</span>
        <div class="pratica-info">
          <div class="pratica-titulo">${item.titulo}</div>
          <div class="pratica-duracao">⏱ ${item.duracao}</div>
        </div>
      </div>
      <div class="pratica-bloco"><span class="pratica-label">Como fazer</span><p>${item.como}</p></div>
      <div class="pratica-bloco verde-claro"><span class="pratica-label">Por que funciona</span><p>${item.porque}</p></div>
    </div>`).join('')}
    <h2>${PRATICAS[2].periodo}</h2>
    ${PRATICAS[2].itens.slice(0,1).map(item => `
    <div class="pratica">
      <div class="pratica-header">
        <span class="pratica-num">${item.num}</span>
        <div class="pratica-info">
          <div class="pratica-titulo">${item.titulo}</div>
          <div class="pratica-duracao">⏱ ${item.duracao}</div>
        </div>
      </div>
      <div class="pratica-bloco"><span class="pratica-label">Como fazer</span><p>${item.como}</p></div>
      <div class="pratica-bloco verde-claro"><span class="pratica-label">Por que funciona</span><p>${item.porque}</p></div>
    </div>`).join('')}
  </div>
  <div class="footer"><div class="footer-handle">@drjuliaresende</div><div class="footer-pag">3</div></div>
</div>

<div style="page-break-after:always">
  <div class="header"><div class="header-logo">✦ @drjuliaresende</div><div class="header-titulo">Guia de Conexão: 10 Minutos que Mudam o Dia</div></div>
  <div class="conteudo">
    ${PRATICAS[2].itens.slice(1).map(item => `
    <div class="pratica">
      <div class="pratica-header">
        <span class="pratica-num">${item.num}</span>
        <div class="pratica-info">
          <div class="pratica-titulo">${item.titulo}</div>
          <div class="pratica-duracao">⏱ ${item.duracao}</div>
        </div>
      </div>
      <div class="pratica-bloco"><span class="pratica-label">Como fazer</span><p>${item.como}</p></div>
      <div class="pratica-bloco verde-claro"><span class="pratica-label">Por que funciona</span><p>${item.porque}</p></div>
    </div>`).join('')}
    <div class="nota">
      <p>Você não precisa fazer tudo isso todos os dias. Escolha 2 ou 3 práticas que cabem na sua rotina real — não na rotina ideal — e faça com constância.</p>
      <p>Conexão não é um projeto. É um hábito pequeno, repetido, que com o tempo se torna o idioma da sua família.</p>
    </div>
    <p class="autor-sign"><em>Dra. Julia Resende<br>@drjuliaresende</em></p>
  </div>
  <div class="footer"><div class="footer-handle">@drjuliaresende</div><div class="footer-pag">4</div></div>
</div>

<div class="contracapa">
  <div class="logo-svg">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFFFFF" d="M50 15 C28 15 12 32 12 50 C12 62 18 72 28 78 L28 68 C22 63 18 57 18 50 C18 35 32 21 50 21 C68 21 82 35 82 50 C82 57 78 63 72 68 L72 78 C82 72 88 62 88 50 C88 32 72 15 50 15Z"/>
      <path fill="#FFFFFF" d="M50 30 C36 30 25 41 25 55 C25 63 29 70 35 75 L35 65 C31 61 29 58 29 55 C29 43 38 34 50 34 C62 34 71 43 71 55 C71 58 69 61 65 65 L65 75 C71 70 75 63 75 55 C75 41 64 30 50 30Z"/>
    </svg>
  </div>
  <div class="contracapa-produto">O Poder da Rotina</div>
  <div class="contracapa-handle">@drjuliaresende</div>
</div>
</body></html>`;
}

async function gerarPDF() {
  console.log('📄 pdf-agent — Bônus 04...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(buildHTML(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.pdf({ path: OUTPUT_PDF, format: 'A4', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
  await browser.close();
  const stats = require('fs').statSync(OUTPUT_PDF);
  console.log(`✅ bonus-04 — ${(stats.size/1024).toFixed(1)} KB`);
}
gerarPDF().catch(e => { console.error(e.message); process.exit(1); });
