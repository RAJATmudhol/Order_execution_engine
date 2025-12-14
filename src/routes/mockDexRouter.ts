const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface DexQuote {
  dex: "Raydium" | "Meteora";
  price: number;
  fee: number;
}

export class MockDexRouter {
  private basePrice = 20;

  async getRaydiumQuote(): Promise<DexQuote> {
    await sleep(300);
    return {
      dex: "Raydium",
      price: this.basePrice * (0.98 + Math.random() * 0.04),
      fee: 0.003,
    };
  }

  async getMeteoraQuote(): Promise<DexQuote> {
    await sleep(300);
    return {
      dex: "Meteora",
      price: this.basePrice * (0.97 + Math.random() * 0.05),
      fee: 0.002,
    };
  }

  selectBestQuote(quotes: DexQuote[]): DexQuote {
    return quotes.reduce((best, current) => {
      const bestEffective = best.price * (1 + best.fee);
      const currentEffective = current.price * (1 + current.fee);
      return currentEffective < bestEffective ? current : best;
    });
  }

  async executeSwap(
    quote: DexQuote,
    slippageTolerance: number
  ) {
    // Simulate execution time (2–3s)
    await sleep(2000 + Math.random() * 1000);

    // Apply slippage (price may worsen slightly)
    const slippageImpact =
      1 + Math.random() * slippageTolerance;

    const finalPrice = Number(
      (quote.price * slippageImpact).toFixed(4)
    );

    return {
      txHash:
        "MOCK_TX_" + Math.random().toString(36).substring(2),
      executedPrice: finalPrice,
    };
  }
}
