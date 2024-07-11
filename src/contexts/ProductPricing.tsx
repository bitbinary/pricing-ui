import { ProductsSelectionTypes } from "@/components/ProductPricing/ProductsSelectionType";
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
  productsSearchValues?: {
    searchString?: string;
    productOrsku?: string;
    segment?: string;
    category?: string;
    brand?: string;
  };
  setProductsSearchValues: React.Dispatch<
    React.SetStateAction<{
      searchString?: string;
      productOrsku?: string;
      segment?: string;
      category?: string;
      brand?: string;
    }>
  >;
  productsSearchResults: Array<{
    name: string;
    sku: string;
    description: string;
    imgSrc: string;
  }>;
  setProductsSearchResults: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        sku: string;
        description: string;
        imgSrc: string;
      }>
    >
  >;
  selectedProducts: string[];
  updateSelectedProducts: (skus: string[], removeSkus?: boolean) => void;
  priceAdjustments: {
    baseOn: string;
    mode: string;
    incrementMode: string;
    adjustmentValue: number;
  };
  setPriceAdjustments: React.Dispatch<
    React.SetStateAction<{
      baseOn: string;
      mode: string;
      incrementMode: string;
      adjustmentValue: number;
    }>
  >;
  filters: {
    segments: string[];
    category: string[];
    brand: string[];
  };
}

const ProductPricingContext = createContext<IProductPricingContext | undefined>(
  undefined
);

export const ProductPricingProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [productsSelectionType, setProductsSelectionType] =
    useState<ProductsSelectionTypes>(ProductsSelectionTypes.MULTIPLE);
  const [productsSearchValues, setProductsSearchValues] = useState<{
    searchString?: string;
    productOrsku?: string;
    segment?: string;
    category?: string;
    brand?: string;
  }>({});
  const [productsSearchResults, setProductsSearchResults] = useState<
    Array<{
      name: string;
      sku: string;
      description: string;
      imgSrc: string;
    }>
  >([]);
  const [priceAdjustments, setPriceAdjustments] = useState<{
    baseOn: string;
    mode: string;
    incrementMode: string;
    adjustmentValue: number;
  }>({
    baseOn: "global",
    mode: "fixed",
    incrementMode: "increase",
    adjustmentValue: 0,
  });

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filters, setFilters] = useState<{
    segments: string[];
    category: string[];
    brand: string[];
  }>({
    segments: [],
    category: [],
    brand: [],
  });

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
    const params = new URLSearchParams(productsSearchValues);

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
