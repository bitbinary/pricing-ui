interface IProduct {
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

export const PRODUCTS: IProduct[] = [
  {
    title: "High Garden  Pinot Noir 2021",
    sku: "HGVPIN216",
    brand: "High Garden",
    categoryId: "Alcoholic Beverage",
    subCategoryId: "Wine",
    segmentId: "Red",
    globalWholesalePrice: 279.06,
    description: "12 x 375ML Can Case",
    thumbnail: "https://picsum.photos/48",
  },
  {
    title: "Koyama Methode  Brut Nature NV",
    sku: "KOYBRUNV6",
    brand: "Koyama Wines",
    categoryId: "Alcoholic Beverage",
    subCategoryId: "Wine",
    segmentId: "Sparkling",
    globalWholesalePrice: 120,
    description: "12 x 375ML Can Case",
    thumbnail: "https://picsum.photos/48",
  },
  {
    title: "Koyama  Riesling 2018",
    sku: "KOYNR1837",
    brand: "Koyama Wines",
    categoryId: "Alcoholic Beverage",
    subCategoryId: "Wine",
    segmentId: "Port/Dessert",
    globalWholesalePrice: 215.04,
    description: "12 x 375ML Can Case",
    thumbnail: "https://picsum.photos/48",
  },
  {
    title: "Koyama Tussock Riesling 2019",
    sku: "KOYRIE19",
    brand: "Koyama Wines",
    categoryId: "Alcoholic Beverage",
    subCategoryId: "Wine",
    segmentId: "White",
    globalWholesalePrice: 215.04,
    description: "12 x 375ML Can Case",
    thumbnail: "https://picsum.photos/48",
  },
  {
    title: "Lacourte-Godbillon Brut Cru NV",
    sku: "LACBNATNV6",
    brand: "Lacourte-Godbillon",
    categoryId: "Alcoholic Beverage",
    subCategoryId: "Wine",
    segmentId: "Sparkling",
    globalWholesalePrice: 409.32,
    description: "12 x 375ML Can Case",
    thumbnail: "https://picsum.photos/48",
  },
];
