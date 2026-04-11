/**
 * pdf-agent — Gerador de PDF
 * Bônus 06: Guia de Disciplina Positiva
 * Dra. Julia Resende — O Poder da Rotina
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_PDF = path.resolve(__dirname, 'bonus-06-guia-disciplina-positiva.pdf');

const SVG_LOGO = `<svg width="60" height="40" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 60 Q10 40 30 20 Q50 0 60 20 Q70 0 90 20 Q110 40 90 60 Q70 80 60 60 Q50 80 30 60Z" fill="none" stroke="white" stroke-width="6" stroke-linejoin="round"/>
  <path d="M45 50 Q30 35 45 22 Q55 12 60 22 Q65 12 75 22 Q90 35 75 50" fill="none" stroke="white" stroke-width="4" stroke-linejoin="round"/>
</svg>`;

const COMPORTAMENTOS = [
  {
    num: 1,
    titulo: 'Birra (2–5 anos)',
    acontecendo: 'A criança não consegue regular uma emoção grande. O sistema executivo do cérebro que controla impulsos ainda está em desenvolvimento. A birra não é manipulação — é incapacidade real.',
    punicao: 'Intensifica. Criança em birra com adulto em birra junto é dois sistemas nervosos desregulados. Ninguém aprende nada.',
    funciona: [
      'Não responda ao conteúdo da birra enquanto ela dura. Aguarde.',
      'Quando a intensidade baixar, ajoelhe-se ao nível da criança. Olho a olho.',
      'Nomeie a emoção dela: "Eu sei que você está com raiva porque queria ficar mais tempo."',
      'Ofereça o limite com calma: "E o combinado era sair às 5. Vamos."',
      'Não negocie o limite — negocie a reconexão depois.',
    ],
    dizer: '"Eu entendo que você está com raiva. E o combinado não muda. Quando você estiver pronta, a gente conversa."'
  },
  {
    num: 2,
    titulo: 'Recusa (todas as idades)',
    acontecendo: 'A criança está testando autonomia (natural e saudável) ou está com o sistema nervoso sobrecarregado e não tem recursos para atender ao pedido agora.',
    punicao: 'Cria luta de poder. Você pode vencer a batalha e perder a guerra — a criança aprende a obedecer por medo, não por escolha.',
    funciona: [
      'Dê controle dentro do limite: "Você pode escovar os dentes agora ou em 5 minutos. Qual você prefere?"',
      'Explique o porquê uma vez, com clareza: "A gente escova os dentes para não doer depois. É uma vez por dia."',
      'Se a recusa persistir, aplique a consequência lógica sem drama. Você coloca a consequência — não a raiva.',
    ],
    dizer: '"Entendo que você não quer agora. Você decide: agora ou em 5 minutos. Mas vai acontecer."'
  },
  {
    num: 3,
    titulo: 'Agressividade (bater, morder, empurrar)',
    acontecendo: 'A criança não tem linguagem para a emoção que está sentindo e usa o corpo. Não é maldade — é vocabulário emocional ainda incompleto.',
    punicao: 'Ensina que força resolve conflito. O adulto que bate na mão da criança que bateu está demonstrando exatamente o comportamento que quer eliminar.',
    funciona: [
      'Interrompa o comportamento com firmeza, sem violência: "Para. Não se bate."',
      'Separe fisicamente se necessário — com calma, sem empurrar.',
      'Nomeie a emoção provável: "Você estava frustrado porque ele pegou seu brinquedo."',
      'Ensine a alternativa: "Quando você está frustrado, você pode pedir para mim. Você pode falar: \'eu estou com raiva\'."',
      'Repare o dano: depois que os ânimos baixam, a criança pede desculpas com entendimento do impacto.',
    ],
    dizer: '"Bater machuca. Você pode estar com raiva — raiva é normal. Bater não é permitido. Vamos pensar no que você pode fazer da próxima vez."'
  },
  {
    num: 4,
    titulo: 'Mentira (a partir de 4–5 anos)',
    acontecendo: 'Mentira nos primeiros anos é desenvolvimento normal. A partir dos 5–6 anos, mentira para evitar punição é sinal de que a punição é intensa demais.',
    punicao: 'Aumenta a mentira. Criança que mente para evitar consequência aprende a mentir melhor, não a falar a verdade.',
    funciona: [
      'Crie um ambiente onde a verdade seja segura: "Eu prefiro que você me conte o que aconteceu."',
      'Quando a mentira aparecer, não dobre a aposta — você já sabe o que aconteceu.',
      'Aborde com curiosidade: "Eu vi o que aconteceu. Me conta o que você estava sentindo."',
      'Aplique consequência proporcional ao comportamento original — não à mentira em cima.',
    ],
    dizer: '"Eu sei o que aconteceu. O que eu quero entender é por que você achou que precisava esconder de mim."'
  },
  {
    num: 5,
    titulo: 'Birra no mercado / espaço público',
    acontecendo: 'A criança está com o sistema nervoso sobrecarregado — barulho, estímulo, fome, cansaço — e o impulso explodiu no pior momento possível para você.',
    punicao: 'Nada útil. Punição em público é humilhação — e humilhação não ensina nada exceto que você pode usar o olhar dos outros como arma.',
    funciona: [
      'Saia do espaço se for possível. Vá para um corredor mais calmo, para fora da loja.',
      'Ajoelhe-se ao nível da criança. Voz baixa, não alta.',
      '"Eu sei que você está com raiva. A gente termina as compras e vai embora."',
      'Não negocie o que estava no plano — finalize o que precisa ser feito e saia.',
      'No carro, depois: "Aquilo foi difícil para você. O que estava acontecendo?"',
    ],
    dizer: '"Eu não vou discutir aqui. Você pode estar frustrado. A gente termina o que veio fazer e vai para casa."'
  },
];

function buildHTML() {
  const comportamentosHtml = COMPORTAMENTOS.map((c, i) => `
    <div class="comportamento ${i > 0 ? '' : ''}">
      <div class="comp-header">
        <span class="comp-num">${c.num}</span>
        <div class="comp-titulo">${c.titulo}</div>
      </div>
      <div class="comp-body">
        <div class="comp-bloco">
          <div class="comp-label">O que está acontecendo</div>
          <p>${c.acontecendo}</p>
        </div>
        <div class="comp-bloco alerta">
          <div class="comp-label" style="color:#c0392b;">O que a punição faz</div>
          <p>${c.punicao}</p>
        </div>
        <div class="comp-bloco verde-claro">
          <div class="comp-label">O que funciona</div>
          <ol class="comp-lista">
            ${c.funciona.map(f => `<li>${f}</li>`).join('')}
          </ol>
        </div>
        <div class="comp-dizer">
          <span class="comp-label-dizer">O que dizer:</span>
          <em>${c.dizer}</em>
        </div>
      </div>
    </div>
  `).join('');

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
  .capa .badge {
    background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.35);
    border-radius: 20px; padding: 6px 18px; margin-bottom: 28px;
    font-size: 11px; color: rgba(255,255,255,0.9); font-weight: 400; letter-spacing: 1px; text-transform: uppercase;
  }
  .capa h1 { font-size: 36px; font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 16px; }
  .capa .subtitulo { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.88); margin-bottom: 36px; line-height: 1.6; }
  .capa .linha { width: 60px; height: 2px; background: rgba(255,255,255,0.6); margin: 0 auto 36px; }
  .capa .autora { font-size: 15px; font-weight: 600; color: #fff; }
  .capa .handle { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.75); margin-top: 4px; }

  /* HEADER / FOOTER */
  .cabecalho {
    background: #03bb85; height: 50px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 30px; margin-bottom: 30px;
  }
  .cabecalho .titulo-cab { font-size: 11px; font-weight: 400; color: #fff; }
  .rodape {
    border-top: 1px solid #e8f7f2; padding: 12px 40px 0;
    display: flex; justify-content: space-between; align-items: center; margin-top: 30px;
  }
  .rodape .handle-rodape { font-size: 10px; font-weight: 400; color: #03bb85; }
  .rodape .pagina-num { font-size: 10px; font-weight: 400; color: #555; }

  /* CONTEÚDO */
  .conteudo { padding: 0 40px; }
  .page-break { page-break-before: always; }

  h1 { font-size: 22px; font-weight: 700; color: #03bb85; margin-bottom: 16px; }
  h2 { font-size: 16px; font-weight: 600; color: #1A1A1A; border-left: 4px solid #03bb85; padding-left: 12px; margin: 24px 0 12px; }
  p { font-size: 13px; font-weight: 400; color: #1A1A1A; line-height: 1.75; margin-bottom: 12px; }

  /* BLOCKQUOTE mecanismo */
  .mecanismo-box {
    background: #e8f7f2; border-left: 4px solid #03bb85;
    padding: 16px 20px; border-radius: 0 8px 8px 0;
    margin: 16px 0; page-break-inside: avoid;
  }
  .mecanismo-box p { margin-bottom: 8px; }
  .mecanismo-box p:last-child { margin-bottom: 0; }

  /* COMPORTAMENTOS */
  .comportamento {
    border: 1px solid #e8f7f2; border-radius: 8px; overflow: hidden;
    margin-bottom: 20px; page-break-inside: avoid;
  }
  .comp-header {
    background: #03bb85; padding: 10px 16px;
    display: flex; align-items: center; gap: 14px;
  }
  .comp-num {
    background: rgba(255,255,255,0.25); color: #fff;
    font-size: 13px; font-weight: 700; width: 28px; height: 28px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .comp-titulo { font-size: 14px; font-weight: 600; color: #fff; }
  .comp-body {}
  .comp-bloco { padding: 10px 16px; border-bottom: 1px solid #e8f7f2; }
  .comp-bloco.alerta { background: #fff8f8; }
  .comp-bloco.verde-claro { background: #f5fdfb; }
  .comp-label { font-size: 10px; font-weight: 600; color: #03bb85; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
  .comp-bloco p { font-size: 12px; line-height: 1.65; margin: 0; }
  .comp-lista { padding-left: 20px; }
  .comp-lista li { font-size: 12px; line-height: 1.65; color: #1A1A1A; margin-bottom: 4px; }
  .comp-dizer {
    background: #03bb85; padding: 10px 16px;
    font-size: 12px; color: #fff; line-height: 1.6;
  }
  .comp-label-dizer { font-weight: 600; font-style: normal; margin-right: 6px; }

  /* SCRIPT 3 FRASES */
  .script-box {
    background: #03bb85; border-radius: 8px; padding: 24px 28px; margin: 16px 0;
    page-break-inside: avoid;
  }
  .script-frase { margin-bottom: 16px; }
  .script-frase:last-child { margin-bottom: 0; }
  .script-frase .frase-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.75); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
  .script-frase .frase-texto { font-size: 14px; font-weight: 600; color: #fff; line-height: 1.5; }
  .script-frase .frase-exemplo { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.85); margin-top: 4px; font-style: italic; }

  /* RECONEXÃO */
  .reconexao-lista { list-style: none; padding: 0; margin: 12px 0; }
  .reconexao-lista li {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 10px 16px; border-bottom: 1px solid #e8f7f2;
    font-size: 13px; line-height: 1.6;
  }
  .reconexao-lista li:last-child { border-bottom: none; }
  .reconexao-num {
    background: #03bb85; color: #fff; font-size: 11px; font-weight: 700;
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
  }

  /* NOTA FINAL */
  .nota-final {
    background: #e8f7f2; border-left: 4px solid #03bb85;
    padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 24px 0;
    page-break-inside: avoid;
  }
  .nota-final p { margin-bottom: 8px; }
  .nota-final .assinatura { font-size: 12px; color: #03bb85; font-style: italic; text-align: right; margin: 0; }

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
  ${SVG_LOGO.replace('width="60"', 'width="80"').replace('height="40"', 'height="54"')}
  <div style="height:32px"></div>
  <div class="badge">Bônus 06 — O Poder da Rotina</div>
  <h1>Guia de<br>Disciplina Positiva</h1>
  <div class="subtitulo">Como responder aos comportamentos difíceis<br>sem gritar, sem punir, sem culpa.</div>
  <div class="linha"></div>
  <div class="autora">Dra. Julia Resende</div>
  <div class="handle">@drjuliaresende</div>
</div>

<!-- PÁG 2: ANTES DE COMEÇAR + MECANISMO -->
<div style="page-break-after: always;">
  <div class="cabecalho">
    <div>${SVG_LOGO.replace('width="60"', 'width="36"').replace('height="40"', 'height="24"')}</div>
    <div class="titulo-cab">Guia de Disciplina Positiva</div>
  </div>
  <div class="conteudo">
    <h1>Antes de começar: você não está errando</h1>
    <p>Se você grita, você aprendeu que gritar funciona. E funciona — a curto prazo. A criança para, você recupera o controle, o problema imediato se resolve.</p>
    <p>O problema é o que acontece depois: a criança aprende que volume e intensidade são as ferramentas para conseguir o que se quer. Você ensina exatamente o que está tentando eliminar.</p>
    <p>Isso não é falha de caráter. É o resultado previsível de usar a única ferramenta que te ensinaram.</p>
    <p>Este guia mostra outra ferramenta. Uma que ensina em vez de apenas corrigir.</p>

    <h2>Por que punição falha a longo prazo</h2>
    <div class="mecanismo-box">
      <p>Punição funciona pela lógica do custo: se o custo do comportamento for alto o suficiente, a criança para de emitir o comportamento. Simples e eficiente.</p>
      <p>O problema é que punição não ensina o que fazer — só ensina o que não fazer. Quando o adulto que pune sai de perto, o comportamento volta.</p>
      <p>Disciplina positiva funciona pela lógica do aprendizado: a criança entende o que é esperado, por que é esperado, e o que fazer quando o impulso aparecer. Com o tempo, esse processo se internaliza. A criança se regula porque aprendeu — não porque teme.</p>
    </div>
    <p style="font-size:12px;color:#555;font-style:italic;">Disciplina por punição exige que você esteja sempre presente para manter o comportamento. Disciplina por aprendizado trabalha mesmo quando você não está olhando.</p>
  </div>
  <div class="rodape">
    <div class="handle-rodape">@drjuliaresende</div>
    <div class="pagina-num">2</div>
  </div>
</div>

<!-- PÁG 3: COMPORTAMENTOS 1–2 -->
<div style="page-break-after: always;">
  <div class="cabecalho">
    <div>${SVG_LOGO.replace('width="60"', 'width="36"').replace('height="40"', 'height="24"')}</div>
    <div class="titulo-cab">Guia de Disciplina Positiva</div>
  </div>
  <div class="conteudo">
    <h1>Os 5 comportamentos difíceis — e como responder</h1>
    ${COMPORTAMENTOS.slice(0, 2).map(c => `
    <div class="comportamento">
      <div class="comp-header">
        <span class="comp-num">${c.num}</span>
        <div class="comp-titulo">${c.titulo}</div>
      </div>
      <div class="comp-body">
        <div class="comp-bloco">
          <div class="comp-label">O que está acontecendo</div>
          <p>${c.acontecendo}</p>
        </div>
        <div class="comp-bloco alerta">
          <div class="comp-label" style="color:#c0392b;">O que a punição faz</div>
          <p>${c.punicao}</p>
        </div>
        <div class="comp-bloco verde-claro">
          <div class="comp-label">O que funciona</div>
          <ol class="comp-lista">${c.funciona.map(f => `<li>${f}</li>`).join('')}</ol>
        </div>
        <div class="comp-dizer">
          <span class="comp-label-dizer">O que dizer:</span>
          <em>${c.dizer}</em>
        </div>
      </div>
    </div>`).join('')}
  </div>
  <div class="rodape">
    <div class="handle-rodape">@drjuliaresende</div>
    <div class="pagina-num">3</div>
  </div>
</div>

<!-- PÁG 4: COMPORTAMENTOS 3–5 -->
<div style="page-break-after: always;">
  <div class="cabecalho">
    <div>${SVG_LOGO.replace('width="60"', 'width="36"').replace('height="40"', 'height="24"')}</div>
    <div class="titulo-cab">Guia de Disciplina Positiva</div>
  </div>
  <div class="conteudo">
    ${COMPORTAMENTOS.slice(2, 5).map(c => `
    <div class="comportamento">
      <div class="comp-header">
        <span class="comp-num">${c.num}</span>
        <div class="comp-titulo">${c.titulo}</div>
      </div>
      <div class="comp-body">
        <div class="comp-bloco">
          <div class="comp-label">O que está acontecendo</div>
          <p>${c.acontecendo}</p>
        </div>
        <div class="comp-bloco alerta">
          <div class="comp-label" style="color:#c0392b;">O que a punição faz</div>
          <p>${c.punicao}</p>
        </div>
        <div class="comp-bloco verde-claro">
          <div class="comp-label">O que funciona</div>
          <ol class="comp-lista">${c.funciona.map(f => `<li>${f}</li>`).join('')}</ol>
        </div>
        <div class="comp-dizer">
          <span class="comp-label-dizer">O que dizer:</span>
          <em>${c.dizer}</em>
        </div>
      </div>
    </div>`).join('')}
  </div>
  <div class="rodape">
    <div class="handle-rodape">@drjuliaresende</div>
    <div class="pagina-num">4</div>
  </div>
</div>

<!-- PÁG 5: SCRIPT 3 FRASES + RECONEXÃO + NOTA FINAL -->
<div>
  <div class="cabecalho">
    <div>${SVG_LOGO.replace('width="60"', 'width="36"').replace('height="40"', 'height="24"')}</div>
    <div class="titulo-cab">Guia de Disciplina Positiva</div>
  </div>
  <div class="conteudo">
    <h1>Script de 3 frases para situações de crise</h1>
    <p style="margin-bottom:16px;">Quando você está no limite e não consegue pensar com clareza, use estas 3 frases nesta ordem:</p>
    <div class="script-box">
      <div class="script-frase">
        <div class="frase-label">Frase 1 — Nomeia a emoção da criança</div>
        <div class="frase-texto">"Eu vejo que você está [com raiva / frustrado / com medo]."</div>
      </div>
      <div class="script-frase">
        <div class="frase-label">Frase 2 — Estabelece o limite</div>
        <div class="frase-texto">"E [o comportamento] não é permitido / o combinado é [X]."</div>
      </div>
      <div class="script-frase">
        <div class="frase-label">Frase 3 — Oferece o caminho</div>
        <div class="frase-texto">"Quando você estiver pronto, a gente [resolve / conversa / continua]."</div>
        <div class="frase-exemplo">Exemplo: "Eu vejo que você está com raiva. E bater no seu irmão não é permitido. Quando você estiver pronto, a gente conversa sobre o que aconteceu."</div>
      </div>
    </div>

    <h2>Como reconectar após conflito</h2>
    <p>O conflito não termina quando o comportamento para. Termina quando a relação é reparada.</p>
    <ul class="reconexao-lista" style="border:1px solid #e8f7f2;border-radius:8px;overflow:hidden;margin-bottom:16px;">
      <li><span class="reconexao-num">1</span><div><strong>Reconecte fisicamente.</strong> Um abraço, um toque no ombro, sentar perto. Corpo antes de palavras.</div></li>
      <li><span class="reconexao-num">2</span><div><strong>Reconheça o que foi difícil para ela.</strong> "Aquilo foi intenso para você. Eu entendo." Não valida o comportamento — valida a emoção que gerou o comportamento.</div></li>
      <li><span class="reconexao-num">3</span><div><strong>Feche o ciclo com clareza.</strong> "A gente passou por uma situação difícil. Está resolvido. Ainda te amo do mesmo jeito."</div></li>
    </ul>
    <p style="font-size:12px;color:#555;font-style:italic;margin-bottom:24px;">Crianças que crescem em famílias onde o conflito é seguido de reparação aprendem que relacionamentos sobrevivem a momentos difíceis. Isso é a base da segurança emocional.</p>

    <div class="nota-final">
      <p>Disciplina positiva não significa sem limites. Significa limites com explicação, com consequências lógicas, com reparação — e sem humilhação.</p>
      <p>Você pode ser firme e gentil ao mesmo tempo. Não são opostos. São a combinação que funciona.</p>
      <div class="assinatura">Dra. Julia Resende · @drjuliaresende</div>
    </div>
  </div>
  <div class="rodape">
    <div class="handle-rodape">@drjuliaresende</div>
    <div class="pagina-num">5</div>
  </div>
</div>

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
  console.log('📄 pdf-agent — Bônus 06...');
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
  const size = (fs.statSync(OUTPUT_PDF).size / 1024).toFixed(1);
  console.log(`✅ bonus-06 — ${size} KB`);
})();
