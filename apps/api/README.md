# DFS - API

Microservice to handle chat conversation request

## Prerequisites

To be able to run this project you need:

- node >= 18 (https://nodejs.org/)
- pnpm (https://pnpm.io/) as package manager
- docker

## Steps to Init

Before running this API you need to setup the database and seed default data, following these steps:

- Install all dependencies by running `pnpm install` on workspace root folder
- Create an `.env` file on `apps/api` folder and fill with variables present on `env.sample`
- Again on workspace root folder run `docker compose up -d`
- Once you have the database image running run the command `npx prisma migrate dev` inside `apps/api` folder
- Then run `pnpm run db:seed` to fill with default data

## Running locally

After succeeding the `Steps to Init` you are able to run this API locally or with all other workspace apps.

- Run `pnpm run dev`, if everything is ok you will see the log saying your API is running on Port 3000 (by default)

- You can check the API documentation on Swagger and manually test by accessing `localhost:3000/docs`

## Test

- You are able to run manually unit and integration tests by running:
  - `pnpm test` (run once)
  - `pnpm test:watch` (keep watching for changes and retesting)
  - `pnpm test:coverage` (you will see the coverage %)
  - `pnpm test:ui` (you will be able to visually see tests and charts related to)

## Endpoints

- GET `/agents/available` (it returns the agent less busy at the time)
- GET `/topics` (it returns the list of fixed topics)
- POST `/chat-sessions` (it creates a new chat session to link user, agent and chosen topic)

# Design Patterns and Concepts:

- Repository Pattern
- In Memory Repository Pattern
- Factory Pattern
- State Pattern
- TDD
- Clean Architecture
- Domain Drive Design
- SOLID

# Challenge 1: Agent Assignment Queue

- Plan an architecture for selecting an available agent.

## Requirements

- The available agent must be assigned in a balanced manner to a new chat.
- The agent queue balancing should be ordered in ascending order by agent x number of active chats.

## Criteria for the Solution

- The solution should have low complexity, considering that this is not the main focus of my solution for the job role.
- It should be performant, avoiding fetching all agents to perform any sorting.
- It should be efficient and provide a senior-level solution, even though it is not the main focus of the solution for the job role.

## Solution

- There will be two related tables in this process: agents and chat_sessions.
- The balancing will be done through an SQL query that selects the first agent with a left join of the tables, ordering in ascending order by the number of active sessions for each agent.
