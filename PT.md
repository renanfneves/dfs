# Análise dos Requisitos
  - Vamos dividir os requisitos em partes e analisar o que é esperado em cada uma delas:

## Backend (Node.js com TypeScript)
  ### Microservice:
  - Você deve criar um microservice que será responsável por gerenciar o chat entre o usuário e um atendente de serviço ao cliente.

  ### Endpoints:
  - Endpoint 1: Retornar o nome do atendente de serviço ao cliente disponível para conversar com o usuário.
  - Endpoint 2: Retornar um conjunto de tópicos que o usuário pode escolher. Esses tópicos devem incluir sugestões e a árvore de nós não deve ter mais de dois níveis de profundidade.

  ### Estrutura da Árvore de Tópicos:
  - A árvore de tópicos terá uma profundidade máxima de 2 níveis.
  - Cada tópico raiz pode ter sub-tópicos (por exemplo, "Premier League" é um sub-tópico de "Football").
  - Ao selecionar um tópico, o usuário deve ser capaz de navegar pela árvore até o nível máximo de profundidade.


## Frontend (React com TypeScript)
  ### Interface do Usuário:
  - A aplicação deve ter um botão de chat. Ao clicar neste botão, deve-se abrir um modal.

  - Este modal faz uma requisição ao primeiro endpoint para obter o atendente disponível e exibe o nome no cabeçalho do modal.

  - Após escolher o atendente, os tópicos raiz são exibidos para o usuário.

  - Ao clicar em um tópico, as sugestões relacionadas a esse tópico devem ser exibidas até que a profundidade máxima seja atingida.
  - Quando a profundidade máxima for atingida, exibir uma mensagem de agradecimento.


  ### Framework:
  - Deve ser usado Angular ou React, com preferência para React nas últimas versões, utilizando TypeScript.

  ### Estilização:
  - A estilização não é obrigatória, mas pode ser feita de acordo com a preferência, dado que o desafio é focado em backend e lógica de aplicação.

## Requisitos Extras
  ### Testes:
  - Unit Tests: Cada peça lógica deve ser coberta por testes unitários.
  - E2E Tests: O comportamento do sistema como um todo deve ser testado de ponta a ponta.

  ### CI/CD (GitHub Actions):
  - Criar uma pipeline simples utilizando GitHub Actions que execute todos os testes mencionados acima automaticamente.
