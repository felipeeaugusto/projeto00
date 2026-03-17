# GUIA — Sistema de Memória AIOX
**Versão:** 1.0
**Criado por:** Atlas (@analyst) — 2026-03-16
**Para:** Felipe — usar em todo projeto novo com AIOX

---

## O que é esse sistema

Um sistema que garante que nenhuma informação se perde entre sessões, computadores ou agentes. Todo agente que você chamar — em qualquer computador — vai saber exatamente onde o projeto parou, o que foi aprovado e o que falta fazer.

É como um caderno que todos os agentes leem ao chegar e atualizam ao sair.

---

## Como funciona na prática

**Quando você abre uma sessão:**
O agente lê o caderno e mostra:
```
📋 Retomando do caderno:
🔴 Prioridade máxima: [item 1]
🟡 Pendências: [lista]
➡️ Próximo passo sugerido: [ação]
Quer começar por aí?
```

**Quando você aprova algo:**
O agente avisa automaticamente:
```
✅ Anotei no caderno: [o que foi aprovado].
```

**Quando você vai parar:**
O agente mostra o resumo e pergunta:
```
📋 Resumo da sessão:
✅ Fizemos: [lista do que foi feito hoje]
🔄 Ainda falta: [pendências]
➡️ Na próxima sessão começamos em: [próximo passo]

Posso salvar e fazer push? (sim/não)
```
Você fala sim. Ele salva e faz push. Pronto.

---

## O que você precisa criar em cada projeto novo

### Arquivo 1 — O caderno (`PROJETO-STATUS.md`)
Fica na raiz do projeto. É onde tudo é registrado.

### Arquivo 2 — A regra (já existe no AIOX)
Fica em `.claude/rules/project-log.md`. Já está instalada no seu AIOX.

### Arquivo 3 — Instrução global (já existe no AIOX)
Fica em `.claude/CLAUDE.md`. Já está instalada no seu AIOX.

---

## Passo a passo para um projeto novo

### Passo 1 — Criar o projeto e iniciar o AIOX
```
mkdir nome-do-projeto
cd nome-do-projeto
claude
```

### Passo 2 — Chamar o Atlas e criar o caderno
```
/AIOX:agents:analyst
*create-project-log
```
O Atlas vai te fazer 6 perguntas e criar o `PROJETO-STATUS.md` automaticamente.

### Passo 3 — Inicializar o GitHub
```
git init
git add .
git commit -m "feat: início do projeto"
gh repo create nome-do-repositorio --public --source=. --remote=origin --push
```

Pronto. O sistema está ativo.

---

## Estrutura do PROJETO-STATUS.md

Todo caderno tem estas seções obrigatórias:

```markdown
# PROJETO-STATUS — [Nome do Projeto]
> Caderno vivo do projeto.

## 🌐 Visão Geral do Projeto
- Produto, objetivo, cliente, patrão

## 📋 Sobre o Projeto
- URLs, repositório, pasta, servidor local

## ✅ O Que Já Foi Feito
- Tudo que foi aprovado, com detalhes

## 🔄 Pendências
- 🔴 Prioridade máxima
- 🟡 Prioridade alta
- 🟢 Prioridade baixa

## ➡️ Próximos Passos Priorizados
- Lista ordenada do que fazer a seguir

## 💡 Perfil do Usuário
- Como ele trabalha, o que gosta, quem é o aprovador final

## 📝 Decisões Importantes
- Tabela com decisões que não podem se perder

## 🗓️ Histórico de Sessões
- Uma entrada por sessão com data, o que foi feito e onde parou
```

---

## Como alternar entre computadores sem perder nada

**Ao sair de um computador:**
1. Fale "vou parar" para o agente
2. Ele mostra o resumo — você confirma
3. Ele faz o push automaticamente
4. Fecha o terminal

**Ao abrir em outro computador (primeira vez):**
```
git clone https://github.com/seu-usuario/nome-do-repositorio
cd nome-do-repositorio
git pull
claude
/AIOX:agents:[agente que quiser]
```

**Todo dia depois disso:**
```
cd nome-do-repositorio
git pull
claude
/AIOX:agents:[agente que quiser]
```

---

## Palavras que ativam o salvamento automático

| O que você diz | O que o agente faz |
|----------------|-------------------|
| "gostei" / "aprovado" / "ficou bom" / "perfeito" / "ficou excelente" | Anota no caderno e avisa |
| "vou parar" / "vou dormir" / "até amanhã" / "por hoje é isso" / "vou sair" | Mostra resumo, salva e faz push |

---

## Regras que nunca podem ser quebradas

1. **O `PROJETO-STATUS.md` é a única fonte da verdade** — nenhum agente pode usar git log, stories antigas ou handoffs antigos como status do projeto
2. **Todo agente lê o caderno ao ativar** — sem exceção
3. **Todo agente avisa antes de anotar** — você sempre sabe o que foi salvo
4. **O push é automático ao final da sessão** — você nunca perde nada

---

## Arquivos do sistema (onde ficam)

| Arquivo | Localização | O que faz |
|---------|-------------|-----------|
| Caderno do projeto | `PROJETO-STATUS.md` (raiz do projeto) | Registra tudo |
| Regra de salvamento | `.claude/rules/project-log.md` | Instrui os agentes |
| Protocolo global | `.claude/CLAUDE.md` | Instrução máxima — todos os agentes obedecem |
| Template do caderno | `.aiox-core/development/templates/projeto-status-tmpl.md` | Modelo para projetos novos |
| Task de criação | `.aiox-core/development/tasks/create-project-log.md` | Cria o caderno via `*create-project-log` |

---

## Comando rápido para projetos novos

Após instalar o AIOX em uma pasta nova, chame o Atlas e execute:
```
*create-project-log
```
Ele cria o caderno com as informações do projeto e o sistema já está ativo.

---

*Gerado por Atlas (@analyst) — Synkra AIOX — 2026-03-16*
