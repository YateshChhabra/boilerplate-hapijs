"use strict";
import * as dotenv from "dotenv";
dotenv.config();
import knex from "./db";
import Hapi, { Server } from "@hapi/hapi";
import userRoutes  from "./routes/user";

export let server: Server;
export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "localhost",
    routes: {
      cors: {
        credentials: true,
      },
    },
  });

  // Routes
  server.route(userRoutes);
  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  server.decorate("request", "database", knex);
  server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});

init()
  .then(() => start())
  .catch((err) => console.error(err));
