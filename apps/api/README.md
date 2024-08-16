[] agents endpoint
[] topics endpoint

% coverage --ui

design patterns:

- Repository Pattern
- In Memory Repository Pattern
- Factory Pattern
- State Pattern


# Desafio: Fila de Atribuição de Agent

  - Planejar uma arquitetura de escolha de agent disponível.

## Requisitos

  - O Agent disponível deve ser atribuído de forma balanceada ao um novo Chat.
  - O Balanceamento da fila de Agents deve ser ordenado por ordem crescente de agent x número de chats ativos.

## Solução

  - Haverá duas tabelas relacionadas neste processo agents e chat_sessions.
  - Para o balanceamento será feito a partir de uma query SQL irá selecionar o primeiro agent e um left join das tabelas, ordenando de forma ASC pelo numero de sessões ativas de cada agent.

## Critérios para a solução

  - Deveria ser de complexidade baixa levando em consideração que este não é o foco maior da minha solução para o perfil da vaga.
  - Deveria ser performático, evitar buscar todos os agents para fazer qualquer ordenação.
  - Deveria ser eficiente e ser uma solução nível considerada senior mesmo não sendo o foco da solução para o perfil da vaga.