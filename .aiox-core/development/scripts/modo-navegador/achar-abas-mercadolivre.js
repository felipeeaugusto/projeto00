// achar-abas-mercadolivre.js — localização validada das abas fixas do Mercado Livre
// (Anúncios / Anúncios Patrocinados) dentro de um `context` do Modo Navegador.
//
// Por que este módulo existe (18/08/2026): antes dele, cada script novo escrevia sua
// própria versão de "achar a aba certa" — e cada versão reintroduzia bugs já corrigidos
// em OUTRA versão anterior, porque reescrever do zero não copia lição nenhuma. Caso real
// que motivou a criação deste módulo: `reprocessar-analise-oficial-completo.js` (18/08)
// reescreveu a busca da aba de Anúncios exigindo o endereço terminar em `#menu-user` —
// um bug que `pipeline-lote-25-91.js` (12/08) já não tinha (usava um padrão mais solto).
// Ao mesmo tempo, a versão de 12/08 tinha OUTRO bug que a de 18/08 não tinha (confundia
// a aba de Anúncios com a aba "Alterar", que também contém "/anuncios/" na URL). Nenhuma
// versão escrita isoladamente, do zero, ficou 100% certa — só ficou depois de comparar
// as duas. Esse módulo existe pra que essa comparação nunca precise ser refeita: os 2
// padrões abaixo já resolvem os 2 problemas ao mesmo tempo, testados e validados.
//
// Mesmo padrão de módulo persistido já usado por `abrir-aba-background.js` e
// `minimize-chrome.js` — qualquer script novo importa direto daqui, nunca reescreve
// a lógica de match de aba do zero (BLOCO 0-AA do CLAUDE.md).

// Aba de Anúncios (Gestão de anúncios): aceita a URL base (com "#") OU já em resultado
// de busca (com "?search=..."), mas NUNCA a aba "Alterar" (que tem "/" logo após
// "anuncios", não "?"/"#"/fim-de-string).
const PADRAO_ABA_ANUNCIOS = /vendedores\.mercadolivre\.com\.br\/anuncios(\?|#|$)/;

// Aba de Anúncios Patrocinados: caminho exato, nunca um dashboard de campanha
// específica (`.../campaigns/.../dashboard`) nem a lista de campanhas
// (`.../campaigns?...`) — ambos também vivem sob `ads.mercadolivre.com.br`.
const PADRAO_ABA_ADS_PATROCINADOS = /ads\.mercadolivre\.com\.br\/product-ads\/admin\/ads(\?|$)/;

function acharAbaAnuncios(context) {
  return context.pages().find((p) => PADRAO_ABA_ANUNCIOS.test(p.url()));
}

function acharAbaAdsPatrocinados(context) {
  return context.pages().find((p) => PADRAO_ABA_ADS_PATROCINADOS.test(p.url()));
}

module.exports = {
  PADRAO_ABA_ANUNCIOS,
  PADRAO_ABA_ADS_PATROCINADOS,
  acharAbaAnuncios,
  acharAbaAdsPatrocinados,
};
