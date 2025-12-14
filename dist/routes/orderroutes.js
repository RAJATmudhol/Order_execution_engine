"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = orderRoutes;
const order_1 = require("../model/order");
const order_socket_1 = require("../websocket/order.socket");
async function orderRoutes(app) {
    app.post("/execute", async (req, reply) => {
        const { tokenIn, tokenOut, amount } = req.body;
        if (!tokenIn || !tokenOut || !amount || amount <= 0) {
            return reply.status(400).send({
                error: "Invalid order payload",
            });
        }
        const order = await order_1.Order.create({
            tokenIn,
            tokenOut,
            amount,
            status: "pending",
        });
        return reply.send({
            orderId: order.orderId,
        });
    });
    app.get("/execute", { websocket: true }, order_socket_1.orderSocketHandler);
}
