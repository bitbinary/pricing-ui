import {
  IPriceAdjustments,
  IProductSearchBar,
  IProductSearchFilters,
  IProductSearchResult,
  ProductsSelectionTypes,
} from "@/types/Product";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const PRICING_PROFILE_ID = "pricing-profile-1";

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
  updateSelectedProducts: (SKUs: string[], removeSKUs?: boolean) => void;
  priceAdjustments: IPriceAdjustments;
  setPriceAdjustments: React.Dispatch<React.SetStateAction<IPriceAdjustments>>;
  filters: IProductSearchFilters;
  savePricingProfile?: () => void;
  isLoading?: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // This function will update the selected products based on the SKUs passed
  // If removeSKUs is true, it will remove the SKUs from the selected products
  // We use this method to handle selection even when te list changes
  const updateSelectedProducts = (SKUs: string[], removeSKUs = false) => {
    if (removeSKUs) {
      setSelectedProducts(
        selectedProducts.filter((productSku) => !SKUs.includes(productSku))
      );
    } else {
      setSelectedProducts(Array.from(new Set([...selectedProducts, ...SKUs])));
    }
  };

  // fetch the pricing profile current state
  useEffect(() => {
    const fetchPricingProfile = async () => {
      const response = await fetch(
        `/api/pricing-profiles/${PRICING_PROFILE_ID}`
      )
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error fetching pricing profile", error);
          return {};
        });

      if (response) {
        setProductsSelectionType(response.selectionType);
        setPriceAdjustments({
          ...{
            baseOn: response.adjustmentbasedon,
            mode: response.adjustmentmode,
            incrementMode: response.adjustmentincrementmode,
            adjustmentValue: response.adjustmentvalue,
          },
        });
        setSelectedProducts([...response?.products]);
      }
    };

    fetchPricingProfile();
  }, []);

  useEffect(() => {
    // remove the filter values that are empty
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

  const savePricingProfile = async () => {
    setIsLoading(true);
    const response = await fetch(
      `/api/pricing-profiles/${PRICING_PROFILE_ID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: PRICING_PROFILE_ID,
          selectionType: productsSelectionType,
          adjustmentbasedon: priceAdjustments.baseOn,
          adjustmentmode: priceAdjustments.mode,
          adjustmentincrementmode: priceAdjustments.incrementMode,
          adjustmentvalue: priceAdjustments.adjustmentValue,
          products: selectedProducts,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Pricing profile saved.");
      });

    setIsLoading(false);
  };

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
        savePricingProfile,
        isLoading,
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
