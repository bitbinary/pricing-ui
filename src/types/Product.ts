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
