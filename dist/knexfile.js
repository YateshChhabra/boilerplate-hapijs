"use strict";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;
// Update with your config settings.
const config = {
    development: {
        client: "pg",
        connection: DB_URL,
        migrations: {
            directory: "./migrations",
            extension: "ts",
        },
        seeds: { directory: "./seeds" },
    },
    staging: {
        client: "postgresql",
        connection: DB_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./migrations",
            extension: "ts",
        },
        seeds: { directory: "./seeds" },
    },
    production: {
        client: "postgresql",
        connection: DB_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./migrations",
            extension: "ts",
        },
        seeds: { directory: "./seeds" },
    },
};
module.exports = config;
