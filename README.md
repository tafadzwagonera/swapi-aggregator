# Swapi-Aggegrator 

This repository contains a microservices architecture built using NestJS's [hybrid application](https://docs.nestjs.com/faq/hybrid-application) and Redis for aggregating [Star Wars API (SWAPI)](https://swapi.dev/documentation) characters and films. The project is divided into two microservices: `SwapiPeopleService` and `SwapiFilmsService`. The services communicate with each other to fetch and aggregate data related to Star Wars characters and films, and exposes an endpoint `/people/:id` which aggregates a SW character along with films they've featured in.

## Table of Contents
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Overview](#overview)
  - [SwapiPeopleService](#swapipeopleservice)
  - [SwapiFilmsService](#swapifilmsservice)
- [Endpoints](#endpoints)
  - [People Microservice](#people-microservice)
  - [Films Microservice](#films-microservice)

## Installation

1. Install Node.js version `>= v20.10.0`. If you don't have node.js `>= v20.10.0` readily installed you can install NVM as per the following [instructions](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating). Once NVM is installed you can follow the instructions below to install a compatible Node.js version. You can check the available versions using `nvm ls-remote` and choose a version from the list. 
```bash
nvm use 20.10.0
nvm alias default 20.10.0
# You'll need to restart `bash` from terminal with `source ~/.bashrc` for each window or by closing and starting a new Terminal application.
```

2. Install Redis as instructed [here](https://redis.io/docs/install/install-redis/). How you install Redis depends on your operating system and whether you would like to install it bundled with Redis Stack and Redis UI. Visit the appropriate guide at the provided link for a compatible installation. Once you've Redis installed you should start your service on your local machine and ensure that Redis is running on port `6379`. 

3. Now that you've the correct Node.js version install you can `git clone` the repository.
```bash
  git clone git@github.com:tafadzwagonera/swapi-aggregator.git
```

4. Install dependencies.
```bash
cd ~/path/to/swapi-aggregator # Verify that you're in `swapi-aggregator` directory.
npm i
```

Now that you've everything set up it's time to run the application.

## How To Run

To run the microservices, use the following commands

```bash
cd ~/path/to/swapi-aggregator # Verify that you're in `swapi-aggregator` directory
cp .env.example .env
vim .env # Enter value for environmetn variables and save. See Exhibit 1 for a minimal .env.
echo .env # Verify that `.env` has the correct values.
npm run start:dev
```

#### Exhibit 1
```bash
NODE_ENV=development
PORT=3004
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
SWAGGER_API_BEARER_TOKEN=.... # A meaningful `uuid` of your choice. For example `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`.
```

At this point the microservices should  be running and ready to handle requests. You should see output logs of the following nature

```bash
[HH:MM:ss] File change detected. Starting incremental compilation...

[HH:MM:ss] Found 0 errors. Watching for file changes.

[Nest] 64090  - dd/MM/yyyy, HH:MM:ss     LOG [NestFactory] Starting Nest application...
[Nest] 64090  - dd/MM/yyyy, HH:MM:ss     LOG [InstanceLoader] HttpModule dependencies initialized +24ms
[Nest] 64090  - dd/MM/yyyy, HH:MM:ss     LOG [InstanceLoader] ConfigHostModule dependencies initialized +1ms
```

## Overview

### `SwapiPeopleService`
The `SwapiPeopleService` microservice fetches information about Star Wars characters (people) from the SWAPI. It exposes an endpoint to retrieve details about a specific person.

#### Key Components
- `SwapiPeopleController`: Handles incoming HTTP requests for people-related data.
- `SwapiPeopleService`: Communicates with the SWAPI to fetch person details.

### `SwapiFilmsService`
The `SwapiFilmsService` microservice fetches information about Star Wars films from the SWAPI. It exposes an endpoint to retrieve details about a specific film.

#### Key Components
- `SwapiFilmsController`: Handles incoming HTTP requests for film-related data
- `SwapiFilmsService`: Communicates with the SWAPI to fetch film details.

## Endpoints

### People Microservice
- Endpoint: `/people/:id`
- Method: GET
- Parameters:
  - id `number`: The ID of the Star Wars character.
    
#### Example Response:
```JSON
{
  "films": [
    {
      "director": "George Lucas",
      "releaseDate": "1977-05-25",
      "title": "A New Hope"
    },
    {
      "director": "Irvin Kershner",
      "releaseDate": "1980-05-17",
      "title": "The Empire Strikes Back"
    },
    {
      "director": "Richard Marquand",
      "releaseDate": "1983-05-25",
      "title": "Return of the Jedi"
    },
    {
      "director": "George Lucas",
      "releaseDate": "2005-05-19",
      "title": "Revenge of the Sith"
    }
  ],
  "name": "Luke Skywalker"
}
```

### Films Microservice
- Endpoint: `/films/:id`
- Method: GET
- Parameters:
  - id `number`: The ID of the Star Wars film.

#### Example Response:
```JSON
{
  "director": "George Lucas",
  "releaseDate": "1977-05-25",
  "title": "A New Hope"
}
```