
## For copilot instructions

- O Copilot acompanha cada fase do desenvolvimento, respeitando limites de contexto, não pulando fases.  
- Sempre há memória persistente (documentação, decisões) pra manter continuidade entre sessões.  
- O workflow começa com uma fase de setup inicial (“START Phase”) se o projeto ainda não foi inicializado adequadamente.

## Fases do RIPER

| Fase | Objetivo principal | O que Copilot DEVE fazer | O que NÃO fazer |
|---|---|---|---|
| **Research** | Compreender o problema, contexto, dependências, requisitos existentes, limites. | Perguntar clarificações, buscar documentação, mapear APIs, ver o que já existe no código. Gerar resumo do que foi encontrado. | Não começar a codificar. Não assumir nada sem confirmação. |
| **Innovate** | Gerar ideias de soluções variadas, alternativas técnicas, trade‑offs. | Propor 2‑3 abordagens diferentes. Indicar prós/contras, impacto de custo, performance, manutenibilidade. | Não escolher uma sem discussão. Não ignorar limitações técnicas ou de prazo. |
| **Plan** | Decidir uma abordagem, desenhar plano de ação mínimo, definir etapas, dividir tarefas. | Criar um esquema de alto nível: identificar componentes principais, delimitar responsabilidades, definir principais interfaces e pontos de integração. Estabelecer métricas de sucesso e critérios de aceitação. Criar uma sequência lógica de implementação. | Não detalhar implementações específicas. Não escrever código funcional nesta fase. Não detalhar excessivamente estruturas de dados ou algoritmos. |
| **Execute** | Implementar o plano aprovado, com qualidade, seguindo padrões. | Gerar código, escrevendo testes, documentação inline; seguir estilo e padrões do projeto; fazer commits pequenos, explicativos; pedir feedback se dúvida. | Não comprometer qualidade por velocidade. Evitar mudança de plano sem aviso. Não ignorar erros ou warnings. |
| **Review** | Verificar se o que foi implementado corresponde ao plano, se está robusto, seguro, limpo. | Fazer revisão de código; testar funcionalmente; checar performance e segurança; documentar lições aprendidas; ajustar onde necessário. Gerar relatório de revisão. | Não aceitar atalhos ou “funciona suficiente”. Não pular esta fase mesmo que pareça trivial.|

## Fase Inicial (“START Phase”)

Antes de começar RIPER, se o projeto está em estado “zerado” ou mal estruturado, Copilot ajuda a montar:

1. Requisitos — definição do escopo mínimo, stakeholder, contexto.  
2. Tecnologias — linguagens, frameworks, bibliotecas existentes, padrões do time.  
3. Arquitetura — estrutura de pastas, camadas, módulos, dependências iniciais.  
4. Scaffolding — gerar esqueleto de módulos, configurações básicas, scripts de build/CI.  
5. Ambiente — setup local, integração, variáveis, pipelines, docker ou etc.  
6. Memory Bank — criar repositório de decisões, documentação persistente, registro de hipóteses, trade‑offs.

## Instruções de Uso do Copilot (“modo colaborativo”)

- Sempre esclarecer se há exigência de prazo, restrições de performance ou segurança.  
- Se sugerir mudanças de plano ou arquitetura durante execução, sinalizar claramente: “isto altera o plano aprovado”.  
- Toda ideia nova entra em Innovate, não direto em Execute.  
- Ao final de cada fase‑Review, salvar o estado (decisões, o que foi descartado) no Memory Bank.  
- Em sessões distintas, referenciar o Memory Bank pra manter continuidade.

## Checklist de Qualidade

- Cada fase tem artefato/documento produzido (pesquisa, planos, reviews).  
- Veja se há cobertura de testes.  
- Código segue padrões de estilo, naming, organização.  
- Decisões (por que escolheu algo) estão registradas.  
- Feedback incorporado após Review.  
