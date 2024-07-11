import { useProductPricing } from "@/contexts/ProductPricing";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";

export const ProductsSearchResults = () => {
  const { productsSearchResults, selectedProducts, updateSelectedProducts } =
    useProductPricing();
  const [selectAllProducts, setSelectAllProducts] = useState(false);

  const handleSelectAll = () => {
    setSelectAllProducts(!selectAllProducts);
    const productSkus = productsSearchResults.map((product) => product.sku);
    if (!selectAllProducts) {
      updateSelectedProducts(productSkus);
    } else {
      updateSelectedProducts(productSkus, true);
    }
  };

  const handleProductSelection = (sku: string) => {
    if (selectedProducts.includes(sku)) {
      updateSelectedProducts([sku], true);
    } else {
      updateSelectedProducts([sku]);
    }
  };

  useEffect(() => {}, [selectedProducts]);

  return (
    <div className="space-y-4">
      {productsSearchResults.length > 0 && (
        <div className="space-x-4">
          <Checkbox
            id="select-all-products"
            checked={selectAllProducts}
            onClick={handleSelectAll}
          />
          <Label htmlFor="select-all-products" className="text-sm">
            Select All
          </Label>
        </div>
      )}
      {productsSearchResults?.map((product, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Checkbox
            id={`product-${index}`}
            onClick={() => handleProductSelection(product.sku)}
            checked={selectedProducts.includes(product.sku)}
          />
          <Image
            src={product.imgSrc}
            alt={product.name}
            width={48}
            height={48}
            className="w-10 h-10"
          />
          <div className="flex flex-col">
            <Label className="text-sm">{product.name}</Label>
            <div className="space-x-4 text-sm">
              <span className="text-muted-foreground">{product.sku}</span>
              <span className="text-muted-foreground">
                {product.description}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
