import { Order } from "../model/order";

export default async function orderSocketHandler(conn: any, req: any) {
  const { orderId } = req.query;

  const interval = setInterval(async () => {
    const order = await Order.findOne({ where: { orderId } });
    if (!order) return;

    conn.socket.send(
      JSON.stringify({
        orderId,
        status: order.status,
        dex: order.dex,
        txHash: order.txHash,
        executedPrice: order.executedPrice,
      })
    );

    if (
      order.status === "confirmed" ||
      order.status === "failed" 
    ) {
      clearInterval(interval);
      conn.socket.close();
    }
  }, 1000);
}
