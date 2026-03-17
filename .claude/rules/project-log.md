# Project Log — Regra Universal para Todos os Agentes

## O que é isso

Todo projeto tem um arquivo `PROJETO-STATUS.md` na sua pasta raiz. Ele é o **caderno vivo do projeto** — registra tudo que foi feito, pendências, próximos passos e o perfil do usuário.

**Esta regra se aplica a TODOS os agentes AIOX:** @dev, @qa, @architect, @pm, @po, @sm, @analyst, @devops e qualquer outro.

---

## Regra 1 — Ao ser ativado (PRIORIDADE MÁXIMA)

Quando qualquer agente for ativado neste projeto:

1. **Leia o `PROJETO-STATUS.md` PRIMEIRO** — antes de qualquer outra coisa, inclusive antes de ler handoffs
2. O `PROJETO-STATUS.md` é a **fonte da verdade** — ele sempre tem o estado mais atual do projeto
3. **Ignore sugestões de handoffs antigos** se contradizerem o que está no `PROJETO-STATUS.md`
4. Se o usuário não disser o que quer fazer, **sugira o próximo passo** com base na seção "Próximos Passos Priorizados" do `PROJETO-STATUS.md`

Exemplo de abertura ideal:
> "Vi no caderno que a próxima prioridade é o script Python compositor. Quer começar por aí?"

**IMPORTANTE:** Handoffs em `.aiox/handoffs/` são secundários e podem estar desatualizados. O `PROJETO-STATUS.md` sempre prevalece.

---

## Regra 2 — Quando o usuário aprovar algo

Quando o usuário usar palavras como: *"gostei", "ficou bom", "ficou excelente", "aprovado", "pode salvar", "perfeito", "isso mesmo"* — ou qualquer indicação clara de aprovação:

1. **Notifique imediatamente** o que vai ser salvo:
   > "Anotei no caderno: [descreva em 1 linha o que foi aprovado]. Posso continuar?"

2. **Atualize o `PROJETO-STATUS.md`:**
   - Adicione o item em "✅ O que Já Foi Feito"
   - Remova de "🔄 Pendências" se aplicável
   - Atualize "➡️ Próximos Passos" se necessário
   - Registre a decisão em "💡 Decisões Importantes" se for relevante

3. **Não salve sem avisar** o usuário — ele sempre deve saber o que foi anotado

---

## Regra 3 — Quando o usuário disser que vai parar

Quando o usuário disser: *"vou parar", "vou dormir", "por hoje é isso", "até amanhã", "vou sair"* — ou similar:

1. **Mostre o resumo da sessão:**
   > "Hoje fizemos: [lista do que foi feito]. Ainda falta: [pendências]. Posso salvar assim no caderno?"

2. **Aguarde confirmação** do usuário

3. **Atualize o `PROJETO-STATUS.md`:**
   - Adicione nova entrada em "🗓️ Histórico de Sessões" com data, o que foi feito e onde parou
   - Atualize todas as seções relevantes

---

## Regra 4 — Formato de atualização do histórico

Ao adicionar entrada no histórico de sessões, use sempre:

```
### Sessão — YYYY-MM-DD
**Feito:** [resumo do que foi feito e aprovado]
**Parou em:** [último ponto da conversa — o que está em andamento]
```

---

## Regra 5 — Pendências apontadas pelo usuário

Se o usuário mencionar algo que ainda precisa ser feito — mesmo sem aprovar nada — adicione em "🔄 Pendências" imediatamente e avise:
> "Anotei nas pendências: [item]. Continuando..."

---

## Localização do arquivo

- **Projeto LP:** `packages/landing-page-dr-julia/PROJETO-STATUS.md`
- **Outros projetos:** procure `PROJETO-STATUS.md` na pasta raiz do projeto ativo

---

*Esta regra é permanente e se aplica a todas as sessões futuras.*
