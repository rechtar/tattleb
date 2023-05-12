"use strict";

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString:
        "postgres://postgres:postgres@localhost:5432/tattle",
      // ssl: { rejectUnauthorized: false },
      ssl: false,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
};
