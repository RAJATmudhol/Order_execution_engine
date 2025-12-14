import { Worker } from "bullmq";
import  redis  from "../config/redix";
import { Order } from "../model/order";
import { MockDexRouter } from "../routes/mockDexRouter";

const router = new MockDexRouter();

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export  const orderWorker = new Worker(
  "order-execution",
  async (job) => {
    const { orderId } = job.data;

    const order = await Order.findOne({ where: { orderId } });
    if (!order) throw new Error("Order not found");

    await order.update({ status: "routing" });

    const raydium = await router.getRaydiumQuote();
    const meteora = await router.getMeteoraQuote();
    const best = router.selectBestQuote([raydium, meteora]);

    await order.update({
      status: "building",
      dex: best.dex,
    });

    const execution = await router.executeSwap(best, 0.01);

    await order.update({
      status: "confirmed",
      txHash: execution.txHash,
      executedPrice: execution.executedPrice,
    });

    return execution;
  },
  {
     connection: redis, concurrency: 10 
  }
);
