"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    tokenIn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tokenOut: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "routing", "building", "submitted", "confirmed", "failed"),
        defaultValue: "pending",
    },
    dex: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    txHash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    executedPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "orders",
    timestamps: true,
});
