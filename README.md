# ExpressJS Server Boilerplate

It’s a RESTful API server.

It’s using NodeJS, ExpressJS, and Mongoose (Mongo).

## Installation

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env-example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com/) object data modeling using [Mongoose](https://sequelize.org/)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [babel-plugin-inline-dotenv](https://github.com/brysgo/babel-plugin-inline-dotenv) and [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Logger**: using [morgan](https://github.com/expressjs/morgan)
- **Security**: using [helmet](https://github.com/helmetjs/helmet)
- **File Upload**: using [express-fileupload](https://github.com/richardgirges/express-fileupload)

## Commands

Start project for development:

```bash
yarn dev
```

Start project for production:

```bash
yarn start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=port

# Token secret key
TOKEN_SECRET=token_secret
REFRESH_TOKEN_SECRET=refresh_token_secret

# Database URL of MongoDB
DB_URL=database_url
```

## Project Structure

```
src\
 |--api\            # Define routers, controllers and services for API
 |--middlewares\    # Define middlewares
 |--models\         # Define database models
 |--utils\          # Define helper functions
 |--index.js        # App entry point
```
