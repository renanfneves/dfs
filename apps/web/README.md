# DFS - Web

Web app to handle chat conversation request

## Prerequisites

To be able to run this project you need:

- node >= 18 (https://nodejs.org/)
- pnpm (https://pnpm.io/) as package manager
- docker

## Steps to Init

Before running this API you need to setup the database and seed default data, following these steps:

- Install all dependencies by running `pnpm install` on workspace root folder
- Create an `.env` file on `apps/web` folder and fill with variables present on `env.sample`

## Running locally

After succeeding the `Steps to Init` you are able to run this Web app locally or with all other workspace apps.

- Run `pnpm run dev`, if everything is ok you will see the log saying your app is running on Port 5173 (by default). By running `dev` make sure your api is also running.

- Run `pnpm run dev:test`, if everything is ok you will see the log saying your app is running on Port 9999. By running `dev:test` all requests made will be mocked by `msw` handlers, so you don't need to run your api.

## Test

- You are able to run manually unit, integration and e2e tests by running:
  - `pnpm test` (to run test mixed between integration and unit tests)
  - `pnpm e2e:test` (to run e2e tests logging in terminal)
  - `pnpm e2e:test:ui` (to open playwright tests pipeline in ui mode)

# Challenges

## 1. Architecture api requests

- According to the code challenge requirements, the frontend must make two API requests: one to get topics and another to get an agent. However, it is required that the get agent request is made at the moment the modal is opened, always fetching the available agent.

- In the planning of my project, I defined `@tanstack/react-query` as the server-side state manager and designed a step-based layout for each node in the topic tree in the chat UX.

## Requirements

- When the modal opens, a request must be made to get the agent.

## Criteria for the Solution

- The data from the request when the modal opens must always be fresh.
- The agent should remain the same while the modal instance is open.
- When a new modal is opened, a new request should be made.

## Solution

- Configure a query with `useQuery`, setting `Infinity` as the `staleTime`.
- Utilize the query in the first step of the chat.
- Manage the modal state and clear the query cache in the modal close function.

## 2. Agent Name in Modal Title

- Assign the agent's name to the modal title without making a preemptive request to get the agent.

## Requirements

- Render the agent's name in the modal title.

## Criteria for the Solution

- The modal component is instantiated in the page component.
- The request to get the agent should only be made when the modal is opened.

## Solution

- Update the custom hook containing the `useQuery` with the request to get the agent to accept a boolean `enabled` parameter.
- Assign the `enabled` property to the respective `useQuery` option.
- Utilize the custom hook in the page component, linking the modal's state to the `enabled` property.
