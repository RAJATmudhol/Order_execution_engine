import { FastifyInstance } from "fastify";
import { Order } from "../model/order";
import { orderQueue } from "../queue/orderqueue";
import  orderSocketHandler  from "../websocket/order.socket";

export default async function orderRoutes(app: FastifyInstance) {

  app.post("/execute", async (req, reply) => {
    const { tokenIn, tokenOut, amount } = req.body as any;

    if (!tokenIn || !tokenOut || !amount || amount <= 0) {
      return reply.status(400).send({ error: "Invalid payload" });
    }

    const order = await Order.create({
      tokenIn,
      tokenOut,
      amount,
      status: "pending",
    });

    await orderQueue.add("execute-order", {
      orderId: order.id,
    });

    return reply.send({ orderId: order.id });
  });

  app.get("/execute", { websocket: true }, orderSocketHandler);
}
