import { IProduct } from "@/types/Product";

export const SearchResultsDTO = (products: IProduct[]) => {
  return products.map((product: IProduct) => ({
    name: product.title,
    sku: product.sku,
    description: product.description,
    imgSrc: product.thumbnail,
  }));
};
