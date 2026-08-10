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
