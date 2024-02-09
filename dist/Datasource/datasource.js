"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Haritha123",
    database: "Project",
    logging: true,
    synchronize: false,
    //entities:[Customer,Order,Custinfo,OrderItem,Product,Supplier],
    entities: ["dist/Entities/*.entity.js"],
    migrations: ["dist/migrations/*.js"],
    options: {
        trustServerCertificate: true
    },
    requestTimeout: 300000,
});
exports.default = AppDataSource;
