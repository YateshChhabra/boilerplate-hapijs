import Knex from "knex";
const config = require('./knexfile')

const HAPI_ENV = process.env.HAPI_ENV || "development";
const knexConfig = config[HAPI_ENV];
// Set environment from `.env`
const knex = Knex(knexConfig);

export default knex;
