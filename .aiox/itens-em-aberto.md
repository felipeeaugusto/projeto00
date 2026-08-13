# Itens em Aberto

Lista leve e incremental de coisas discutidas em conversa mas ainda não formalizadas em arquivo, ou tarefas adiadas — alimentada em tempo real pela BLOCO 2-B do `CLAUDE.md`.

**Como usar:**
- Qualquer agente adiciona uma linha aqui NA HORA que algo fica "combinado só de boca" (spec, formato, decisão) ou uma tarefa é adiada.
- A BLOCO 0-K checa este arquivo (não o `.jsonl` inteiro) antes de qualquer oferta de handoff — é por isso que precisa ficar sempre atualizado.
- Remover a linha quando o item for formalizado/resolvido — este arquivo não deve virar um histórico, só o que está genuinamente em aberto agora.

**Formato de cada linha:**
`- [DATA] [agente que registrou] — [item, em 1 linha] — [arquivo/local afetado]`

---

## Itens abertos

- [10/08/2026] aiox-master — Retrofit técnico completo (formato de saída visível + checagem barata) ainda falta ser aplicado nas BLOCO 0-C, 0-N, 0-O, 0-L — hoje elas só têm a referência ao PRINCÍPIO, não o mecanismo — arquivo: `.claude/CLAUDE.md`
- [10/08/2026] aiox-master — `check-handoff-audit.js` foi testado só com 3 cenários manuais construídos, não com uso real em produção — regex de detecção de oferta de handoff pode ter falso positivo/negativo ainda não descoberto — arquivo: `.claude/hooks/check-handoff-audit.js`
- [11/08/2026] dev — INCIDENTE (reprioritizado por Felipe): página real "Produtos Perdendo Catálogo em Ads" segue renomeada pra "Prioridade - Fora de Ads" com linhas 1-2 sobrescritas — Felipe esclareceu que os dados dessa página são cópia desatualizada da página 1 ("Produtos em Ads Atualmente") de uma análise antiga, então NÃO é urgente restaurar o conteúdo exato de antes — prioridade real é terminar a análise das linhas 2-91 (Excel local `Analise Oficial.xlsx`) o mais rápido possível, pra atualizar as 4 páginas do Google Sheets de uma vez, com dado atual — arquivo/local: Planilha do Ads ML (Google Sheets)
- [13/08/2026] analyst (via *elicit, a pedido do @dev) — scripts ad-hoc de automação do Modo Navegador (Playwright/CDP) abrem aba nova (`openBackgroundPage`) mas só chamam `page.close()` no caminho feliz — em erro/timeout a aba fica aberta. Causou acúmulo real de 8 abas duplicadas da mesma planilha Google Sheets numa sessão, contribuindo pra travamento por sobrecarga de sincronização colaborativa em tempo real. Corrigir o padrão (page.close() garantido em finally, ou reaproveitar aba existente em vez de sempre abrir nova) — não é escopo do @analyst corrigir, registrado pra o @dev tratar quando conveniente — arquivo/local: scripts em `packages/karzen/.aiox-runtime/*.js` que usam `openBackgroundPage`
- [13/08/2026] dev — ainda restam ~45 arquivos não commitados em `packages/karzen/.aiox-runtime/` (scripts `teste-linha2-*`/`teste-linha3-*`/`teste-linha4-*`, `achar-catalogo-lote.js`, `colorir-lote.ps1`, `criar-paginas-sheets.js`, `processar-lote.js`, JSONs de estado, etc.) que parecem ser de um esforço anterior de processamento linha-a-linha da planilha `Analise Oficial.xlsx` — não são desta sessão (só os scripts da investigação WAP W2 4.17L foram commitados agora, ver commit `c980728`). Não commitados por não ter contexto suficiente pra saber se ainda são relevantes ou já obsoletos — precisa o Felipe decidir se comita, descarta ou se ainda estão em uso — arquivo/local: `packages/karzen/.aiox-runtime/`
