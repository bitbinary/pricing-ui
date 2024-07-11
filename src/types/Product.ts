export interface IProduct {
  title: string;
  sku: string;
  brand: string;
  categoryId: string;
  subCategoryId: string;
  segmentId: string;
  globalWholesalePrice: number;
  description?: string;
  thumbnail?: string;
}

export interface IProductSearchResult {
  name: string;
  sku: string;
  description: string;
  imgSrc: string;
}

export interface IProductSearchBar {
  searchString?: string;
  productOrsku?: string;
  segment?: string;
  category?: string;
  brand?: string;
}

export interface IProductSearchFilters {
  segments: string[];
  category: string[];
  brand: string[];
}

export interface IPriceAdjustments {
  baseOn: string;
  mode: string;
  incrementMode: string;
  adjustmentValue: number;
}

export enum ProductsSelectionTypes {
  SINGLE = "single",
  MULTIPLE = "multiple",
  ALL = "all",
}

export enum PricingAdjustmentModeOptions {
  FIXED = "fixed",
  PERCENTAGE = "percentage",
}

export enum PricingAdjustmentIncrementOptions {
  INCREASE = "increase",
  DECREASE = "decrease",
}

export enum PriceBasedOnOptions {
  GLOBAL = "global",
}
