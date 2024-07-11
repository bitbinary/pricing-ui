import {
  IPriceAdjustments,
  IProductSearchBar,
  IProductSearchFilters,
  IProductSearchResult,
  ProductsSelectionTypes,
} from "@/types/Product";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

interface IProductPricingContext {
  productsSelectionType?: ProductsSelectionTypes;
  setProductsSelectionType: React.Dispatch<
    React.SetStateAction<ProductsSelectionTypes>
  >;
  productsSearchValues?: IProductSearchBar;
  setProductsSearchValues: React.Dispatch<
    React.SetStateAction<IProductSearchBar>
  >;
  productsSearchResults: Array<IProductSearchResult>;
  setProductsSearchResults: React.Dispatch<
    React.SetStateAction<Array<IProductSearchResult>>
  >;
  selectedProducts: string[];
  updateSelectedProducts: (skus: string[], removeSkus?: boolean) => void;
  priceAdjustments: IPriceAdjustments;
  setPriceAdjustments: React.Dispatch<React.SetStateAction<IPriceAdjustments>>;
  filters: IProductSearchFilters;
}

const ProductPricingContext = createContext<IProductPricingContext | undefined>(
  undefined
);

export const ProductPricingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [productsSelectionType, setProductsSelectionType] =
    useState<ProductsSelectionTypes>(ProductsSelectionTypes.MULTIPLE);
  const [productsSearchValues, setProductsSearchValues] =
    useState<IProductSearchBar>({});
  const [productsSearchResults, setProductsSearchResults] = useState<
    Array<IProductSearchResult>
  >([]);
  const [priceAdjustments, setPriceAdjustments] = useState<IPriceAdjustments>({
    baseOn: "global",
    mode: "fixed",
    incrementMode: "increase",
    adjustmentValue: 0,
  });

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filters, setFilters] = useState<IProductSearchFilters>({
    segments: [],
    category: [],
    brand: [],
  });

  // This function will update the selected products based on the skus passed
  // If removeSkus is true, it will remove the skus from the selected products
  // We use this method to handle selection even when te list changes
  const updateSelectedProducts = (skus: string[], removeSkus = false) => {
    if (removeSkus) {
      setSelectedProducts(
        selectedProducts.filter((productSku) => !skus.includes(productSku))
      );
    } else {
      setSelectedProducts(Array.from(new Set([...selectedProducts, ...skus])));
    }
  };

  useEffect(() => {
    Object.keys(productsSearchValues).forEach((key) => {
      if (!productsSearchValues[key as keyof typeof productsSearchValues])
        delete productsSearchValues[key as keyof typeof productsSearchValues];
    });
    const params = new URLSearchParams(
      productsSearchValues as Record<string, string>
    );

    const fetchProducts = async () => {
      const response = await fetch(`/api/products?${params.toString()}`).then(
        (res) => res.json()
      );
      setProductsSearchResults(response.data);
    };

    fetchProducts();
  }, [productsSearchValues]);

  useEffect(() => {
    const fetchFilters = async () => {
      const response = await fetch("/api/products/filters").then((res) =>
        res.json()
      );
      setFilters(response.data);
    };

    fetchFilters();
  }, []);

  return (
    <ProductPricingContext.Provider
      value={{
        productsSelectionType,
        setProductsSelectionType,
        productsSearchValues,
        setProductsSearchValues,
        productsSearchResults,
        setProductsSearchResults,
        selectedProducts,
        updateSelectedProducts,
        priceAdjustments,
        setPriceAdjustments,
        filters,
      }}
    >
      {children}
    </ProductPricingContext.Provider>
  );
};

export const useProductPricing = () => {
  const context = useContext(ProductPricingContext);
  if (!context) {
    throw new Error(
      "useProductPricing must be used within a ProductPricingProvider"
    );
  }
  return context;
};
