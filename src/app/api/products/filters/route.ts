import { PRODUCTS } from "@/app/data/sampleData";
import { IProduct, IProductSearchFilters } from "@/types/Product";

export async function GET() {
  const filters: IProductSearchFilters = {
    segments: [],
    category: [],
    brand: [],
  };

  PRODUCTS.forEach((product: IProduct) => {
    filters.segments.push(product.segmentId);
    filters.category.push(product.categoryId);
    filters.brand.push(product.brand);
  });

  filters.segments = Array.from(new Set(filters.segments));
  filters.category = Array.from(new Set(filters.category));
  filters.brand = Array.from(new Set(filters.brand));

  return Response.json({ data: filters });
}
