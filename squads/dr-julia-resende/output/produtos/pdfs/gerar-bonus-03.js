/**
 * pdf-agent — Gerador de PDF
 * Bônus 03: Checklist de Rotina Visual
 * Dra. Julia Resende — O Poder da Rotina
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const INPUT_MD = path.resolve(__dirname, '../../../data/bonus/bonus-03-checklist-rotina-visual.md');
const OUTPUT_PDF = path.resolve(__dirname, 'bonus-03-checklist-rotina-visual.pdf');

// ── Markdown → HTML simples (sem dependência externa) ──────────────────────
function mdToHtml(md) {
  return md
    // Títulos
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Negrito e itálico
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Blockquote
    .replace(/^> \*(.+)\*$/gm, '<p class="autor-sign">$1</p>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Divisor
    .replace(/^---$/gm, '<hr>')
    // Tabelas markdown → HTML
    .replace(/\| (.*) \|\n\| [-| ]+ \|\n((?:\| .* \|\n?)*)/g, (match, header, rows) => {
      const headers = header.split('|').map(h => h.trim()).filter(h => h);
      const headerHtml = headers.map(h => `<th>${h}</th>`).join('');
      const rowLines = rows.trim().split('\n');
      const rowsHtml = rowLines.map((row, i) => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c);
        const cls = i % 2 === 0 ? 'row-par' : 'row-impar';
        return `<tr class="${cls}">${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
      }).join('');
      return `<table><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
    })
    // Listas com ★ e ○ (versão 2-4 anos)
    .replace(/^\| ★ \| (.+) \| ○ \|$/gm, '<tr class="row-checklist"><td class="star">★</td><td>$1</td><td class="check">○</td></tr>')
    // Listas com número e checkbox
    .replace(/^\| (\d+) \| (.+) \| (☐|✅|○) \|$/gm, '<tr><td class="num">$1</td><td>$2</td><td class="check">$3</td></tr>')
    // Listas comuns
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, match => `<ul>${match}</ul>`)
    // Parágrafos — linhas soltas viram <p>
    .replace(/^(?!<[a-z]|$)(.+)$/gm, '<p>$1</p>')
    // Limpar linhas vazias duplas
    .replace(/\n{3,}/g, '\n\n');
}

// ── Template HTML completo ──────────────────────────────────────────────────
function buildHTML(mdContent) {
  const bodyHtml = mdToHtml(mdContent);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Variáveis ── */
:root {
  --verde: #03bb85;
  --branco: #FFFFFF;
  --escuro: #1A1A1A;
  --secundario: #555555;
  --divisor: #e8f7f2;
  --verde-claro: #f5fdfb;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: var(--escuro);
  background: #FFFFFF;
}

/* ── CAPA ── */
.capa {
  width: 210mm;
  height: 297mm;
  background: var(--verde);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  page-break-after: always;
  padding: 60px 50px;
  text-align: center;
}

.capa-logo-simbolo {
  width: 80px;
  height: 80px;
  margin-bottom: 40px;
}

.capa-logo-simbolo svg {
  width: 100%;
  height: 100%;
}

.capa-bonus-label {
  font-size: 12px;
  font-weight: 300;
  color: rgba(255,255,255,0.75);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.capa-titulo {
  font-size: 38px;
  font-weight: 800;
  color: var(--branco);
  line-height: 1.2;
  margin-bottom: 16px;
}

.capa-subtitulo {
  font-size: 15px;
  font-weight: 400;
  color: rgba(255,255,255,0.85);
  margin-bottom: 40px;
  line-height: 1.6;
}

.capa-linha {
  width: 60px;
  height: 2px;
  background: rgba(255,255,255,0.5);
  margin: 0 auto 40px;
}

.capa-autora-nome {
  font-size: 15px;
  font-weight: 600;
  color: var(--branco);
  margin-bottom: 4px;
}

.capa-autora-handle {
  font-size: 12px;
  font-weight: 300;
  color: rgba(255,255,255,0.7);
}

/* ── PÁGINAS INTERNAS ── */
.pagina {
  width: 210mm;
  min-height: 297mm;
  padding: 0;
  page-break-after: always;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--verde);
  padding: 12px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.header-logo {
  font-size: 11px;
  font-weight: 700;
  color: var(--branco);
  letter-spacing: 1px;
}

.header-titulo {
  font-size: 10px;
  font-weight: 400;
  color: rgba(255,255,255,0.85);
  text-align: right;
}

.conteudo {
  flex: 1;
  padding: 30px 40px 20px;
}

.footer {
  padding: 10px 40px;
  border-top: 1px solid var(--divisor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.footer-handle {
  font-size: 9px;
  font-weight: 400;
  color: var(--verde);
}

.footer-pagina {
  font-size: 9px;
  font-weight: 400;
  color: var(--secundario);
}

/* ── TIPOGRAFIA INTERNA ── */
h1 {
  font-size: 22px;
  font-weight: 700;
  color: var(--verde);
  margin-bottom: 6px;
  margin-top: 24px;
}

h1:first-child { margin-top: 0; }

h2 {
  font-size: 15px;
  font-weight: 600;
  color: var(--escuro);
  border-left: 4px solid var(--verde);
  padding-left: 12px;
  margin: 20px 0 10px;
}

h3 {
  font-size: 12px;
  font-weight: 600;
  color: var(--verde);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 18px 0 8px;
}

p {
  font-size: 13px;
  font-weight: 400;
  color: var(--escuro);
  line-height: 1.75;
  margin-bottom: 10px;
}

blockquote {
  background: var(--verde-claro);
  border-left: 4px solid var(--verde);
  padding: 14px 18px;
  border-radius: 4px;
  font-style: italic;
  margin: 16px 0;
  font-size: 12px;
  color: var(--secundario);
}

hr {
  border: none;
  border-top: 2px solid var(--divisor);
  margin: 20px 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}

ul li {
  font-size: 13px;
  color: var(--escuro);
  line-height: 1.7;
  padding-left: 18px;
  position: relative;
  margin-bottom: 4px;
}

ul li::before {
  content: "•";
  color: var(--verde);
  font-weight: 700;
  position: absolute;
  left: 4px;
}

/* ── TABELAS ── */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 12px;
}

thead tr {
  background: var(--verde);
}

thead th {
  color: var(--branco);
  font-weight: 600;
  padding: 8px 12px;
  text-align: left;
  font-size: 11px;
}

tbody tr.row-par { background: var(--verde-claro); }
tbody tr.row-impar { background: #FFFFFF; }
tbody tr.row-checklist { background: #FFFFFF; }

tbody td {
  padding: 7px 12px;
  border-bottom: 1px solid var(--divisor);
  color: var(--escuro);
}

.star { color: var(--verde); font-weight: 700; font-size: 14px; width: 30px; }
.num { color: var(--verde); font-weight: 600; width: 30px; }
.check { text-align: center; font-size: 16px; width: 40px; }

/* ── ASSINATURA DA AUTORA ── */
.autor-sign {
  font-style: italic;
  color: var(--verde);
  text-align: right;
  font-size: 12px;
  font-weight: 400;
  margin-top: 20px;
}

/* ── CONTRACAPA ── */
.contracapa {
  width: 210mm;
  height: 297mm;
  background: var(--verde);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  page-break-before: always;
}

.contracapa-produto {
  font-size: 22px;
  font-weight: 700;
  color: var(--branco);
  margin-bottom: 10px;
}

.contracapa-handle {
  font-size: 14px;
  font-weight: 300;
  color: rgba(255,255,255,0.75);
}

/* ── Logo SVG inline ── */
.logo-svg-white path { fill: #FFFFFF; }

</style>
</head>
<body>

<!-- ═══════════════════════════════ CAPA ═══════════════════════════════ -->
<div class="capa">

  <!-- Logo: dois arcos em abraço — SVG inline branco -->
  <div class="capa-logo-simbolo">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFFFFF" d="M50 15 C28 15 12 32 12 50 C12 62 18 72 28 78 L28 68 C22 63 18 57 18 50 C18 35 32 21 50 21 C68 21 82 35 82 50 C82 57 78 63 72 68 L72 78 C82 72 88 62 88 50 C88 32 72 15 50 15Z"/>
      <path fill="#FFFFFF" d="M50 30 C36 30 25 41 25 55 C25 63 29 70 35 75 L35 65 C31 61 29 58 29 55 C29 43 38 34 50 34 C62 34 71 43 71 55 C71 58 69 61 65 65 L65 75 C71 70 75 63 75 55 C75 41 64 30 50 30Z"/>
    </svg>
  </div>

  <div class="capa-bonus-label">Bônus 03 — O Poder da Rotina</div>
  <div class="capa-titulo">Checklist de<br>Rotina Visual</div>
  <div class="capa-subtitulo">Rotina diária estruturada por faixa etária<br>para crianças de 2 a 10 anos</div>
  <div class="capa-linha"></div>
  <div class="capa-autora-nome">Dra. Julia Resende</div>
  <div class="capa-autora-handle">@drjuliaresende</div>
</div>

<!-- ═════════════════════════ PÁGINA 1 — Introdução ═════════════════════════ -->
<div class="pagina">
  <div class="header">
    <div class="header-logo">✦ @drjuliaresende</div>
    <div class="header-titulo">Checklist de Rotina Visual</div>
  </div>
  <div class="conteudo">
    <h1>Como usar este checklist</h1>
    <p>Criança pequena não aprende rotina pela instrução verbal. Ela aprende pelo que vê, pelo que repete, pelo que se torna previsível.</p>
    <p>Imprima este checklist e cole na parede do quarto ou na porta da geladeira — na altura dos olhos do seu filho. Nas primeiras semanas, percorra as etapas junto com ele, apontando cada item. Com o tempo, ele vai passar a fazer isso sozinho.</p>
    <p>O objetivo não é controle. É autonomia. Quando a criança sabe o que vem depois, ela para de negociar o que é óbvio — e você para de repetir o que já foi dito.</p>
  </div>
  <div class="footer">
    <div class="footer-handle">@drjuliaresende</div>
    <div class="footer-pagina">1</div>
  </div>
</div>

<!-- ═════════════════════════ PÁGINA 2 — Versão 2-4 anos ═════════════════════════ -->
<div class="pagina">
  <div class="header">
    <div class="header-logo">✦ @drjuliaresende</div>
    <div class="header-titulo">Checklist de Rotina Visual</div>
  </div>
  <div class="conteudo">
    <h1>Versão 1 — Para crianças de 2 a 4 anos</h1>
    <blockquote>Nesta faixa, a rotina é guiada com você do lado. Os ícones ajudam mais do que as palavras.</blockquote>

    <h3>☀️ MANHÃ</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="star">★</td><td>Acordar</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Xixi</td><td class="check">○</td></tr>
        <tr class="row-par"><td class="star">★</td><td>Lavar o rosto</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Escovar os dentes</td><td class="check">○</td></tr>
        <tr class="row-par"><td class="star">★</td><td>Trocar de roupa</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Café da manhã</td><td class="check">○</td></tr>
      </tbody>
    </table>

    <h3>🌤️ TARDE</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="star">★</td><td>Almoço</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Descanso / soneca</td><td class="check">○</td></tr>
        <tr class="row-par"><td class="star">★</td><td>Lanche</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Brincar</td><td class="check">○</td></tr>
        <tr class="row-par"><td class="star">★</td><td>Guardar brinquedos</td><td class="check">○</td></tr>
      </tbody>
    </table>

    <h3>🌙 NOITE</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="star">★</td><td>Jantar</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Banho</td><td class="check">○</td></tr>
        <tr class="row-par"><td class="star">★</td><td>Escovar os dentes</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Pijama</td><td class="check">○</td></tr>
        <tr class="row-par"><td class="star">★</td><td>Hora da história</td><td class="check">○</td></tr>
        <tr class="row-impar"><td class="star">★</td><td>Dormir</td><td class="check">○</td></tr>
      </tbody>
    </table>
  </div>
  <div class="footer">
    <div class="footer-handle">@drjuliaresende</div>
    <div class="footer-pagina">2</div>
  </div>
</div>

<!-- ═════════════════════════ PÁGINA 3 — Versão 5-7 anos ═════════════════════════ -->
<div class="pagina">
  <div class="header">
    <div class="header-logo">✦ @drjuliaresende</div>
    <div class="header-titulo">Checklist de Rotina Visual</div>
  </div>
  <div class="conteudo">
    <h1>Versão 2 — Para crianças de 5 a 7 anos</h1>
    <blockquote>Nesta faixa, a criança já consegue acompanhar a rotina com mais independência. Deixe ela marcar os itens sozinha.</blockquote>

    <h3>☀️ MANHÃ</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="num">1</td><td>Acordar e levantar</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">2</td><td>Banheiro (xixi + lavar rosto)</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">3</td><td>Escovar os dentes</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">4</td><td>Vestir o uniforme / roupa</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">5</td><td>Café da manhã</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">6</td><td>Pegar a mochila</td><td class="check">☐</td></tr>
      </tbody>
    </table>

    <h3>🌤️ TARDE</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="num">1</td><td>Almoço</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">2</td><td>Descanso (20 min sem tela)</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">3</td><td>Tarefa escolar</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">4</td><td>Lanche</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">5</td><td>Brincar livre</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">6</td><td>Guardar brinquedos</td><td class="check">☐</td></tr>
      </tbody>
    </table>

    <h3>🌙 NOITE</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="num">1</td><td>Jantar</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">2</td><td>Banho</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">3</td><td>Escovar os dentes</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">4</td><td>Pijama</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">5</td><td>Leitura ou história</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">6</td><td>Luzes apagadas — dormir</td><td class="check">☐</td></tr>
      </tbody>
    </table>
  </div>
  <div class="footer">
    <div class="footer-handle">@drjuliaresende</div>
    <div class="footer-pagina">3</div>
  </div>
</div>

<!-- ═════════════════════════ PÁGINA 4 — Versão 8+ ═════════════════════════ -->
<div class="pagina">
  <div class="header">
    <div class="header-logo">✦ @drjuliaresende</div>
    <div class="header-titulo">Checklist de Rotina Visual</div>
  </div>
  <div class="conteudo">
    <h1>Versão 3 — Para crianças de 8 anos ou mais</h1>
    <blockquote>Nesta faixa, a criança pode ter responsabilidade real sobre a própria rotina. Você supervisiona — mas ela executa.</blockquote>

    <h3>☀️ MANHÃ</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="num">1</td><td>Acordar no horário (sozinho)</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">2</td><td>Banho ou higiene</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">3</td><td>Vestir</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">4</td><td>Café da manhã</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">5</td><td>Verificar mochila</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">6</td><td>Sair no horário</td><td class="check">☐</td></tr>
      </tbody>
    </table>

    <h3>🌤️ TARDE / ESCOLA</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="num">1</td><td>Almoço</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">2</td><td>Tarefa escolar (sem tela até terminar)</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">3</td><td>Lanche</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">4</td><td>Atividade livre (esporte, leitura, amigos)</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">5</td><td>Preparar material para amanhã</td><td class="check">☐</td></tr>
      </tbody>
    </table>

    <h3>🌙 NOITE</h3>
    <table>
      <thead><tr><th>#</th><th>Ação</th><th>Feito</th></tr></thead>
      <tbody>
        <tr class="row-par"><td class="num">1</td><td>Jantar</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">2</td><td>Banho</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">3</td><td>Higiene noturna</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">4</td><td>Sem telas 30 min antes de dormir</td><td class="check">☐</td></tr>
        <tr class="row-par"><td class="num">5</td><td>Leitura pessoal (opcional)</td><td class="check">☐</td></tr>
        <tr class="row-impar"><td class="num">6</td><td>Dormir no horário combinado</td><td class="check">☐</td></tr>
      </tbody>
    </table>
  </div>
  <div class="footer">
    <div class="footer-handle">@drjuliaresende</div>
    <div class="footer-pagina">4</div>
  </div>
</div>

<!-- ═════════════════════════ PÁGINA 5 — Nota para a mãe ═════════════════════════ -->
<div class="pagina">
  <div class="header">
    <div class="header-logo">✦ @drjuliaresende</div>
    <div class="header-titulo">Checklist de Rotina Visual</div>
  </div>
  <div class="conteudo">
    <h1>Nota para a mãe</h1>
    <p>Nas primeiras semanas, percorra o checklist junto com seu filho. Não como quem cobra — como quem ensina. Aponte cada item, deixe ele marcar, comemore cada conclusão com simplicidade ("pronto, mais um feito").</p>
    <p>Quando a resistência aparecer — e vai aparecer — volte à rotina sem drama. Não é fracasso. É o ponto exato onde o hábito está sendo formado. A consistência não precisa ser perfeita. Precisa ser frequente.</p>
    <p class="autor-sign"><em>Dra. Julia Resende<br>@drjuliaresende</em></p>
  </div>
  <div class="footer">
    <div class="footer-handle">@drjuliaresende</div>
    <div class="footer-pagina">5</div>
  </div>
</div>

<!-- ═══════════════════════════════ CONTRACAPA ═══════════════════════════════ -->
<div class="contracapa">
  <div class="capa-logo-simbolo">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFFFFF" d="M50 15 C28 15 12 32 12 50 C12 62 18 72 28 78 L28 68 C22 63 18 57 18 50 C18 35 32 21 50 21 C68 21 82 35 82 50 C82 57 78 63 72 68 L72 78 C82 72 88 62 88 50 C88 32 72 15 50 15Z"/>
      <path fill="#FFFFFF" d="M50 30 C36 30 25 41 25 55 C25 63 29 70 35 75 L35 65 C31 61 29 58 29 55 C29 43 38 34 50 34 C62 34 71 43 71 55 C71 58 69 61 65 65 L65 75 C71 70 75 63 75 55 C75 41 64 30 50 30Z"/>
    </svg>
  </div>
  <div class="contracapa-produto">O Poder da Rotina</div>
  <div class="contracapa-handle">@drjuliaresende</div>
</div>

</body>
</html>`;
}

// ── Renderizar PDF ──────────────────────────────────────────────────────────
async function gerarPDF() {
  console.log('📄 pdf-agent — iniciando geração...');
  console.log(`   Input : ${INPUT_MD}`);
  console.log(`   Output: ${OUTPUT_PDF}`);

  const mdContent = fs.readFileSync(INPUT_MD, 'utf8');
  const html = buildHTML(mdContent);

  // Salvar HTML de debug (opcional — remove após aprovação)
  const htmlDebugPath = OUTPUT_PDF.replace('.pdf', '-preview.html');
  fs.writeFileSync(htmlDebugPath, html, 'utf8');
  console.log(`   HTML preview salvo: ${htmlDebugPath}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // aguardar Poppins carregar

  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();

  const stats = fs.statSync(OUTPUT_PDF);
  console.log(`\n✅ PDF gerado com sucesso!`);
  console.log(`   Arquivo: ${OUTPUT_PDF}`);
  console.log(`   Tamanho: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`\n— PDF gerado. Produto pronto para entrega.`);
}

gerarPDF().catch(err => {
  console.error('❌ Erro ao gerar PDF:', err.message);
  process.exit(1);
});
