"use client";
import { useProductPricing } from "@/contexts/ProductPricing";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo, useRef } from "react";
import { Input } from "../ui/input";
import { PriceAdjustments } from "./PriceAdjustments";

export const PriceAdjustmentsTable = () => {
  const { selectedProducts, priceAdjustments } = useProductPricing();
  const products = useRef<IProduct[]>([
    {
      title: "High Garden  Pinot Noir 2021",
      sku: "HGVPIN216",
      brand: "High Garden",
      categoryId: "Alcoholic Beverage",
      subCategoryId: "Wine",
      segmentId: "Red",
      globalWholesalePrice: 279.06,
    },
    {
      title: "Koyama Methode  Brut Nature NV",
      sku: "KOYBRUNV6",
      brand: "Koyama Wines",
      categoryId: "Alcoholic Beverage",
      subCategoryId: "Wine",
      segmentId: "Sparkling",
      globalWholesalePrice: 120,
    },
    {
      title: "Koyama  Riesling 2018",
      sku: "KOYNR1837",
      brand: "Koyama Wines",
      categoryId: "Alcoholic Beverage",
      subCategoryId: "Wine",
      segmentId: "Port/Dessert",
      globalWholesalePrice: 215.04,
    },
    {
      title: "Koyama Tussock Riesling 2019",
      sku: "KOYRIE19",
      brand: "Koyama Wines",
      categoryId: "Alcoholic Beverage",
      subCategoryId: "Wine",
      segmentId: "White",
      globalWholesalePrice: 215.04,
    },
    {
      title: "Lacourte-Godbillon Brut Cru NV",
      sku: "LACBNATNV6",
      brand: "Lacourte-Godbillon",
      categoryId: "Alcoholic Beverage",
      subCategoryId: "Wine",
      segmentId: "Sparkling",
      globalWholesalePrice: 409.32,
    },
  ]);

  let inputAdornment = "";
  if (priceAdjustments.incrementMode === "increase") inputAdornment = "+";
  else inputAdornment = "-";
  if (priceAdjustments.mode === "fixed") inputAdornment += "$";
  else inputAdornment += "%";

  const productToAdjust = useMemo((): IProduct[] => {
    return products.current.filter((product: IProduct) =>
      selectedProducts.includes(product.sku)
    );
  }, [selectedProducts]);

  const calculateNewPrice = (
    price: number,
    adjustments: {
      baseOn: string;
      mode: string;
      incrementMode: string;
      adjustmentValue: number;
    }
  ) => {
    if (isNaN(price) || isNaN(adjustments.adjustmentValue)) return price;

    let newPrice = price;

    if (adjustments.mode === "fixed") {
      if (adjustments.incrementMode === "increase") {
        newPrice = price + adjustments.adjustmentValue;
      } else {
        newPrice = price - adjustments.adjustmentValue;
      }
    } else {
      if (adjustments.incrementMode === "increase") {
        newPrice = price + (price * adjustments.adjustmentValue) / 100;
      } else {
        newPrice = price - (price * adjustments.adjustmentValue) / 100;
      }
    }
    if (newPrice < 0) return 0;
    return Number(parseFloat(newPrice.toFixed(2)));
  };
  const columns: ColumnDef<IProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="w-6">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="w-6">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",

      header: "Product Title",
    },
    {
      accessorKey: "sku",
      header: "SKU Code",
    },
    {
      accessorKey: "categoryId",
      header: "Category",
    },
    {
      accessorKey: "globalWholesalePrice",
      header: "Global Wholesale Price",
    },
    {
      id: "adjustment",
      header: "Adjustment",
      cell: ({ row }) => (
        <div className="flex flex-nowrap items-center justify-center">
          <p className="whitespace-nowrap">
            {inputAdornment}&nbsp;
            {priceAdjustments.adjustmentValue}
          </p>
        </div>
      ),
    },
    {
      id: "newPrice",
      header: "New Price",
      cell: ({ row }) => (
        <span>
          {calculateNewPrice(
            row.getValue("globalWholesalePrice"),
            priceAdjustments
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={productToAdjust} />
    </div>
  );
};

interface IProduct {
  title: string;
  sku: string;
  brand: string;
  categoryId: string;
  subCategoryId: string;
  segmentId: string;
  globalWholesalePrice: number;
}
