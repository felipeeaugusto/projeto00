# Project Log — Regra Universal para Todos os Agentes

## O que é isso

Todo projeto tem um arquivo `PROJETO-STATUS.md` na sua pasta raiz. Ele é o **caderno vivo do projeto** — registra tudo que foi feito, pendências, próximos passos e o perfil do usuário.

**Esta regra se aplica a TODOS os agentes AIOX:** @dev, @qa, @architect, @pm, @po, @sm, @analyst, @devops e qualquer outro.

---

## Regra 1 — Ao ser ativado (PRIORIDADE MÁXIMA)

Quando qualquer agente for ativado neste projeto, **imediatamente após o greeting**:

1. **Leia o `packages/landing-page-dr-julia/PROJETO-STATUS.md`** — é a fonte da verdade
2. **Mostre ao usuário** as pendências da seção "🔄 Pendências do Projeto Completo" e os próximos passos da seção "➡️ Próximos Passos Priorizados"
3. **Ignore handoffs antigos** — eles estão desatualizados. Apenas o `PROJETO-STATUS.md` reflete o estado real

**Formato obrigatório após o greeting:**

```
📋 **Retomando do caderno:**

🔴 Prioridade máxima: [item 1 do caderno]
🟡 Pendências: [lista resumida]

➡️ Próximo passo sugerido: [primeiro item de "Próximos Passos Priorizados"]
Quer começar por aí?
```

**NUNCA** usar informação de stories antigas ou git log como status do projeto. Apenas o `PROJETO-STATUS.md`.

---

## Regra 2 — Quando o usuário aprovar algo

Quando o usuário usar palavras como: *"gostei", "ficou bom", "ficou excelente", "aprovado", "pode salvar", "perfeito", "isso mesmo"* — ou qualquer indicação clara de aprovação:

1. **ANTES de salvar qualquer coisa**, pergunte obrigatoriamente:
   > "Posso salvar no caderno: [descreva em 1 linha o que foi aprovado]?"

2. **AGUARDE a confirmação do usuário** — PROIBIDO salvar sem resposta afirmativa.

3. **Somente após confirmação**, atualize o `PROJETO-STATUS.md`:
   - Adicione o item em "✅ O que Já Foi Feito"
   - Remova de "🔄 Pendências" se aplicável
   - Atualize "➡️ Próximos Passos" se necessário
   - Registre a decisão em "💡 Decisões Importantes" se for relevante

4. Confirme ao usuário: "✅ Anotei no caderno: [o que foi salvo]."

**NUNCA salve no caderno sem antes perguntar e receber confirmação.**

---

## Regra 3 — Quando o usuário disser que vai parar

Quando o usuário disser: *"vou parar", "vou dormir", "por hoje é isso", "até amanhã", "vou sair", "vou descansar"* — ou similar:

1. **Mostre o resumo da sessão** neste formato:
   ```
   📋 Resumo da sessão:
   ✅ Fizemos: [lista do que foi feito e aprovado hoje]
   🔄 Ainda falta: [pendências atualizadas]
   ➡️ Na próxima sessão começamos em: [próximo passo]

   Posso salvar e fazer push? (sim/não)
   ```

2. **AGUARDE confirmação** do usuário — não salve nem faça push sem resposta.

3. **Somente após confirmação**, atualize o `PROJETO-STATUS.md`:
   - Adicione nova entrada em "🗓️ Histórico de Sessões" com data, o que foi feito e onde parou
   - Atualize todas as seções relevantes

4. **Execute obrigatoriamente:**
   ```
   git add packages/landing-page-dr-julia/PROJETO-STATUS.md
   git commit -m "chore: atualizar caderno do projeto - sessão YYYY-MM-DD"
   git push
   ```

5. Confirme ao usuário: "✅ Caderno salvo e enviado para o GitHub. Até a próxima!"

**Por que o git push é obrigatório:** Felipe trabalha em 2 PCs. Sem o push, o caderno não sincroniza e o outro PC fica desatualizado — causando perda de informação e retrabalho.

---

## Regra 4 — Formato obrigatório do histórico de sessões

Ao adicionar entrada no histórico, use SEMPRE este formato completo:

```
### SESSÃO — DD/MM/AAAA

**O QUE FOI FEITO:**
- [item concreto realizado e aprovado]
- [item concreto realizado e aprovado]

**O QUE O FELIPE PEDIU:**
- [pedido ou decisão do Felipe nesta sessão]
- [pedido ou decisão do Felipe nesta sessão]

**PENDÊNCIAS:**
🔴 Prioridade Máxima: [o que trava tudo — fazer primeiro]
🟡 Prioridade Normal: [importante, mas não trava]
  - [item]
  - [item]
🔵 Pode deixar pra depois: [baixa prioridade]
  - [item]
  - [item]

**PAROU EM:** [tarefa exata que estava em andamento no momento que a sessão encerrou]
```

**PROIBIDO:**
- Resumir em uma linha o que levou horas de sessão
- Usar seções genéricas sem detalhe concreto
- Omitir o "PAROU EM" — sem ele o Felipe não sabe por onde recomeçar

---

## Regra 5 — Pendências apontadas pelo usuário

Se o usuário mencionar algo que ainda precisa ser feito — mesmo sem aprovar nada — adicione em "🔄 Pendências" imediatamente e avise:
> "Anotei nas pendências: [item]. Continuando..."

---

## Regra 6 — Após interrupção por melhoria/atualização

Quando o fluxo principal for interrompido para corrigir ou implementar uma melhoria (regra, protocolo, hook, etc.), ao concluir a melhoria o agente DEVE:

1. **Mostrar automaticamente** onde o projeto estava antes da interrupção, lido do caderno:
   ```
   📍 Antes de interromper, o projeto estava em:
   [tarefa exata do campo PAROU EM do caderno — ou do contexto da sessão atual]
   ```
2. **Não usar frases vazias** como "vamos retomar", "voltando ao que estávamos fazendo", etc.
3. **Mostrar o estado diretamente** — a informação, não o anúncio de que vai mostrá-la.

**Esta regra se aplica a TODOS os agentes, incluindo @aiox-master.**

---

## Localização do arquivo

- **Projeto LP:** `packages/landing-page-dr-julia/PROJETO-STATUS.md`
- **Outros projetos:** procure `PROJETO-STATUS.md` na pasta raiz do projeto ativo

---

*Esta regra é permanente e se aplica a todas as sessões futuras.*
