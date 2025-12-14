"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_DIALECT, } = process.env;
if (!DB_HOST || !DB_NAME || !DB_USERNAME || !DB_DIALECT) {
    throw new Error("Missing required database environment variables.");
}
exports.sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD || "", {
    host: DB_HOST,
    port: Number(DB_PORT) || 5432,
    dialect: DB_DIALECT, // e.g. "postgres"
    logging: false,
});
