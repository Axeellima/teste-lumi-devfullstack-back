"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
const AppDataSource = new typeorm_1.DataSource(process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
    }
    : {
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT_LOCAL),
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        synchronize: false,
        logging: true,
        entities: process.env.NODE_ENV === "production"
            ? ["dist/entities/*.entity.js"]
            : ["src/entities/*.entity.{ts,js}"],
        migrations: process.env.NODE_ENV === "production"
            ? ["dist/migrations/*.js"]
            : ["src/migrations/*.{ts,js}"],
        ssl: process.env.NODE_ENV === "production" ? true : false,
        extra: process.env.NODE_ENV === "production" && {
            ssl: { rejectUnauthorized: false },
        },
    });
exports.default = AppDataSource;
