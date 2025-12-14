"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const websocket_1 = __importDefault(require("@fastify/websocket"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const orderroutes_1 = __importDefault(require("./routes/orderroutes"));
dotenv_1.default.config();
const app = (0, fastify_1.default)();
const PORT = Number(process.env.PORT) || 5000;
app.register(websocket_1.default);
app.register(orderroutes_1.default, { prefix: "/api/orders" });
const startServer = async () => {
    try {
        await database_1.sequelize.authenticate();
        console.log("Connected to PostgreSQL");
        await database_1.sequelize.sync({ alter: true });
        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`Server is running on http://localhost:${PORT}`);
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
};
startServer();
