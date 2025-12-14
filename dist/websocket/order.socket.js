"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSocketHandler = orderSocketHandler;
const order_1 = require("../model/order");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function orderSocketHandler(conn, req) {
    const { orderId } = req.query;
    if (!orderId) {
        conn.socket.send(JSON.stringify({ error: "orderId is required" }));
        conn.socket.close();
        return;
    }
    const order = await order_1.Order.findOne({ where: { orderId } });
    if (!order) {
        conn.socket.send(JSON.stringify({ error: "Order not found" }));
        conn.socket.close();
        return;
    }
    const sendStatus = async (status, extra = {}) => {
        await order.update({ status, ...extra });
        conn.socket.send(JSON.stringify({
            orderId,
            status,
            ...extra,
        }));
    };
    try {
        await sendStatus("pending");
        await sleep(1000);
        await sendStatus("routing");
        await sleep(1500);
        // Mock DEX decision
        const dex = Math.random() > 0.5 ? "Raydium" : "Meteora";
        await sendStatus("building", { dex });
        await sleep(1500);
        await sendStatus("submitted");
        await sleep(2000);
        await sendStatus("confirmed", {
            txHash: "MOCK_TX_" + Math.random().toString(36).substring(2),
            executedPrice: Number((20 + Math.random()).toFixed(4)),
        });
        conn.socket.close();
    }
    catch (err) {
        await sendStatus("failed", { error: err.message });
        conn.socket.close();
    }
}
