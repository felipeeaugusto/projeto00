# create-project-log

**Task ID:** create-project-log
**Agente:** @analyst (Atlas)
**Quando usar:** Ao iniciar qualquer projeto novo com AIOX

---

## Descrição

Cria o sistema de memória viva do projeto (PROJETO-STATUS.md) e instala a regra de salvamento automático para todos os agentes.

Após executar esta task:
- Todo agente lê o caderno ao ser ativado
- Aprovações são registradas na hora com notificação ao usuário
- Ao final de cada sessão, o resumo é salvo automaticamente

---

## Elicitation

```yaml
elicit: true
```

O agente deve perguntar ao usuário antes de criar o arquivo.

---

## Passos

### Passo 1 — Coletar informações do projeto

Pergunte ao usuário:

1. **Nome do projeto** (ex: "Landing Page Dra. Julia Resende")
2. **Descrição do produto** (ex: "Ebook O Poder da Rotina")
3. **Tipo** (ex: Landing Page, App Web, E-commerce, etc.)
4. **Nome do cliente** (quem você está ajudando)
5. **Aprovador final** (quem valida as decisões maiores — chefe, patrão, cliente)
6. **Primeiro passo do projeto** (o que precisa ser feito primeiro)

---

### Passo 2 — Criar PROJETO-STATUS.md

Use o template em `.aiox-core/development/templates/projeto-status-tmpl.md`.

Substitua os campos `{{campo}}` com as respostas do usuário.

Salve o arquivo em: **raiz do projeto** (mesma pasta onde está o `package.json` ou `index.html`)

---

### Passo 3 — Instalar a regra project-log.md

Verifique se `.claude/rules/project-log.md` já existe no workspace.

**Se não existir:**
- Copie o conteúdo de `.aiox-core/base-rules/project-log.md`
- Salve em `.claude/rules/project-log.md`
- Avise o usuário: "Regra de salvamento automático instalada para todos os agentes."

**Se já existir:**
- Informe: "Regra já instalada. Nenhuma ação necessária."

---

### Passo 4 — Confirmar ao usuário

Mostre:

```
✅ Caderno do projeto criado: PROJETO-STATUS.md
✅ Regra de salvamento ativa para todos os agentes

A partir de agora:
• Todo agente lê o caderno ao iniciar
• Quando você aprovar algo, o agente avisa e anota
• Quando você parar, o agente salva o resumo da sessão
```

---

## Outputs

- `PROJETO-STATUS.md` na raiz do projeto
- `.claude/rules/project-log.md` no workspace (se não existia)

---

## Relacionado

- **Template:** `.aiox-core/development/templates/projeto-status-tmpl.md`
- **Regra base:** `.aiox-core/base-rules/project-log.md`
- **Regra ativa:** `.claude/rules/project-log.md`
