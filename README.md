# nlw-esports-server

Simple rest api to web aplication ESports

## Pré-requisites

- node
- prisma
- config .env file

## Techs

- express
- prisma
- @prisma/client
- typescript
- ts-node-dev

### Config .env file

Create the file `.env` on root path, after creating the variable in this file:

`DATABASE_URL="file:../src/database/db.sqlite"`

## Installation

Clone this project into your project directory:

`git clone https://github.com/esbnet/nlw-esports-server.git`

## Start

Run the following command to start the server:

`yarn install && yarn dev`

## End-Points:

- get `/games'` - Get a list of games
- POST `/game/:id/ads` - Create a ad for the game by id
- GET `/games/:id/ads` - Get ad for the game by id
- GET `/ads/:id/discord` - Get ads for the game selected
