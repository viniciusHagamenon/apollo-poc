# apollo-poc

Apollo Graphql + Express POC using information from [https://punkapi.com/documentation/v2](https://punkapi.com/documentation/v2).

## Server

- Express (Can be removed if only using GraphQL)
- Apollo Graphql
- Prisma
- Postgres
- Docker
- Serverless (TODO - only for production)
- Jest (TODO)

## Client (TODO)

- Express (TODO)
- Next.js (TODO)
- Docker (TODO)
- React (TODO)
- Styled-Component (TODO)
- React-Intl (TODO)
- MobX (TODO)
- Serverless (TODO)
- Jest (TODO)
- Enzyme (TODO)

## Setup

- Rename `.env.example` to `.env` and set the correct environment variables.
- Run `docker-compose up -d`

## Fetch Data from Punk API

Access bash inside the server container:

```
docker exec -it apollo-poc_server_1 /bin/bash
```

Run the script:

```
yarn ts-node scripts/fetch-data.ts
```
