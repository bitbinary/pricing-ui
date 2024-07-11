"use client";
import { ProductPricing } from "@/components/ProductPricing";
import { ProductPricingProvider } from "@/contexts/ProductPricing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24 gap-4">
      <ProductPricingProvider>
        <ProductPricing />
      </ProductPricingProvider>
    </main>
  );
}
