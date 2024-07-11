import { IProduct } from "@/types/Product";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fuzzyMatch(pattern: string, str: string) {
  pattern =
    ".*" +
    pattern
      .split("")
      .map((l) => `${escapeRegExp(l)}.*`)
      .join("");
  const re = new RegExp(pattern, "i");
  return re.test(str);
}

export const searchProductByTitle = (products: IProduct[], title: string) => {
  return products.filter((product) => {
    return fuzzyMatch(title, product.title);
  });
};

export const searchProductBySKU = (products: IProduct[], sku: string) => {
  return products.filter((product) => {
    return fuzzyMatch(sku, product.sku);
  });
};

export const removeDuplicates = (products: IProduct[]) => {
  return products.filter(
    (product, index, self) =>
      index === self.findIndex((t) => t.sku === product.sku)
  );
};
