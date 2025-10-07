# Copilot Instructions — Workflow RIPER Adaptado

Estas instruções adaptam o framework CursorRIPER para uso com GitHub Copilot no VS Code, guiando o fluxo de trabalho em cinco fases, com persistência de contexto e boas práticas.

---

## 1. Research (Pesquisa)
- Analise o código existente, dependências e contexto do projeto.
- Registre descobertas, dúvidas e pontos de atenção em `.cursor/research.mdc`.
- Liste perguntas para o usuário quando necessário.

## 2. Innovate (Inovação)
- Sugira abordagens, brainstorms e alternativas para os problemas identificados.
- Registre ideias em `.cursor/innovate.mdc`.
- Solicite validação do usuário antes de avançar.

## 3. Plan (Planejamento)
- Estruture um plano técnico detalhado em `.cursor/plan.mdc`.
- Inclua checklist de requisitos, etapas e critérios de aceitação.
- Peça aprovação do usuário antes de iniciar a execução.

## 4. Execute (Execução)
- Implemente as soluções conforme o plano aprovado.
- Registre decisões, dificuldades e desvios em `.cursor/execute.mdc`.
- Sempre salve backups antes de sobrescrever arquivos importantes.

## 5. Review (Revisão)
- Valide a implementação comparando com o plano e requisitos.
- Registre feedback, testes e pendências em `.cursor/review.mdc`.
- Só finalize a tarefa após aprovação do usuário.

---

## Boas Práticas para Copilot
- Nunca avance de fase sem confirmação do usuário.
- Sempre registre contexto e decisões nos arquivos apropriados.
- Não sobrescreva arquivos sem backup prévio.
- Oriente o usuário sobre o estado atual do workflow.
- Use comentários claros e objetivos no código.

---

## Estrutura Recomendada de Pastas/Arquivos
```
.cursor/
	research.mdc   # Descobertas e contexto
	innovate.mdc   # Brainstorms e ideias
	plan.mdc       # Plano técnico
	execute.mdc    # Decisões e execução
	review.mdc     # Feedback e validação
```

---

## Exemplo de Checklist de Fase
### [ ] Research concluída
### [ ] Ideias validadas
### [ ] Plano aprovado
### [ ] Execução finalizada
### [ ] Revisão aprovada

---

## Observações
- Adapte as instruções conforme a necessidade do projeto.
- Use o Copilot para automatizar registros e transições de fase sempre que possível.


# MCPs Configurados no Projeto

Este projeto utiliza Model Context Protocol (MCP) para integração com ferramentas externas e automação avançada. Abaixo estão os MCPs configurados em `.vscode/mcp.json`:

## 1. allpepper-memory-bank
- **Descrição:** Permite leitura, escrita e atualização de arquivos de memória persistente (memory bank) para registrar contexto, decisões e histórico do projeto.
- **Comandos:** `memory_bank_read`, `memory_bank_write`, `memory_bank_update`, `list_projects`, `list_project_files`.
- **Uso:** Ideal para persistir informações das fases do workflow RIPER.

## 2. upstash/context7
- **Descrição:** Integração HTTP com o Context7, útil para buscar documentação, exemplos e informações de bibliotecas.
- **Uso:** Pode ser usado para enriquecer a fase de Research e Innovate com dados externos.

## 3. chromedevtools/chrome-devtools-mcp
- **Descrição:** Permite automação e inspeção de páginas web via Chrome DevTools, incluindo navegação, captura de tela, análise de performance e manipulação de elementos.
- **Uso:** Útil para testes end-to-end, validação visual e automação de tarefas web.

---

Consulte o arquivo `.vscode/mcp.json` para detalhes de configuração e variáveis de ambiente.