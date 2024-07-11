"use client";
import { ProductsSelectionType } from "./ProductsSelectionType";
import { ProductsSearchBar } from "./ProductsSearchBar";
import { ProductsSearchResults } from "./ProductsSearchResult";
import { PriceAdjustments } from "./PriceAdjustments";
import { PriceAdjustmentsTable } from "./PriceAdjustmentsTable";
import { Separator } from "@radix-ui/react-separator";

export const ProductPricing = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-0 pb-0">Set Product Pricing</h1>
        <p className="text-muted-foreground">Set details</p>
      </div>
      <Separator className="my-4" />
      <ProductsSelectionType />
      <ProductsSearchBar />
      <Separator className="my-4" />
      <ProductsSearchResults />
      <Separator className="my-4" />
      <PriceAdjustments />
      <PriceAdjustmentsTable />
    </div>
  );
};
