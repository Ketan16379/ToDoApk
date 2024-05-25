import pg, { Client } from "pg";

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "perntodo",
    password: "admin",
    port: 5342
});

module.exports = db;
