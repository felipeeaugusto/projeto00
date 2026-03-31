# Regras do Squad Dr. Julia Resende

> Este arquivo carrega automaticamente quando você está trabalhando em `squads/dr-julia-resende/`.
> Complementa o `.claude/CLAUDE.md` raiz — não substitui.

---

### BLOCO 0-Q — GATE OBRIGATÓRIO DO JULIA-CHIEF PARA TODO CONTEÚDO DO SQUAD DR. JULIA (inegociável)

**Gatilho:** Qualquer agente que receber pedido de geração de conteúdo (post, story, carrossel, vídeo) para o perfil @drjuliaresende / Squad Dr. Julia.

**REGRA ABSOLUTA:** Nenhum conteúdo para o Squad Dr. Julia pode ser gerado sem julia-chief ter sido ativado PRIMEIRO e ter definido explicitamente: formato, pilar, visual (cor), posição na grade, e verificado a alternância com o último conteúdo publicado.

```
ANTES de qualquer geração de conteúdo do Squad Dr. Julia:

PASSO 1: Verificar se julia-chief foi ativado nesta sessão e já definiu:
         - Formato (post único / carrossel / story)
         - Pilar (E / EM / PS / C)
         - Visual (verde / branco / escuro)
         - Posição na grade (post_number, cycle_position do content-state.json)

PASSO 2: SE julia-chief NÃO foi ativado → PARAR IMEDIATAMENTE:
         "Nenhum conteúdo pode ser gerado sem julia-chief definir o plano.
          Quer que eu chame o julia-chief agora?"
         → AGUARDAR confirmação → chamar julia-chief → aguardar definição

PASSO 3: julia-chief DEVE ler content-state.json antes de qualquer decisão:
         → Arquivo: squads/dr-julia-resende/data/content-state.json
         → Verificar: último formato publicado (last_published_format)
         → REGRA DE ALTERNÂNCIA: SE último foi carrossel → próximo feed DEVE ser post único
                                  SE último foi post único → próximo feed PODE ser carrossel
         → SE content-state.json não existe → criar com estado atual antes de operar

PASSO 4: Após julia-chief definir o plano → copy-agent gera o copy → compositor-agent gera visual
         → approval-agent apresenta copy + visual para Felipe aprovar
         → SOMENTE após aprovação do Felipe → publisher-agent publica
         → APÓS publicação → julia-chief atualiza content-state.json
```

**O QUE É PROIBIDO:**
- Gerar copy diretamente sem julia-chief ter definido o formato/pilar
- Gerar visual (compositor-agent) sem copy aprovado pelo julia-chief
- Publicar sem approval-agent ter apresentado e Felipe ter aprovado
- Iniciar produção de conteúdo de qualquer formato sem verificar last_published_format

**O ERRO QUE GEROU ESTA REGRA (2026-03-31):**
Carrossel-01, 02 e 03 foram criados manualmente sem passar pelo julia-chief.
Resultado: dois carrosseis escuros seguidos no feed, sem Post Único entre eles.
O julia-chief TEM a lógica de alternância (JC001-JC003) — ela simplesmente nunca foi usada.
Esta regra garante que nunca mais seja bypassada.

**PIPELINE CORRETO — OBRIGATÓRIO:**
```
julia-chief (define formato/pilar/visual/grade)
  → copy-agent (gera copy seguindo Voice DNA)
  → compositor-agent (gera PNG)
  → approval-agent (apresenta para Felipe aprovar)
  → publisher-agent (publica SOMENTE após aprovação)
  → julia-chief (atualiza content-state.json)
```

**Aplica-se a: copy-agent, compositor-agent, publisher-agent, image-agent, @aiox-master e TODOS os agentes ao receber pedido de conteúdo do Squad Dr. Julia.**
