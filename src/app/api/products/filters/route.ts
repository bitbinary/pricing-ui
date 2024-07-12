import { sql } from "@vercel/postgres";
import { IProduct, IProductSearchFilters } from "@/types/Product";

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export async function GET() {
  const filters: IProductSearchFilters = {
    segments: [],
    category: [],
    brand: [],
  };

  const { rows: Products } = await sql`SELECT * FROM public."Products"`;

  Products.forEach((product) => {
    filters.segments.push(product.segmentid);
    filters.category.push(product.categoryid);
    filters.brand.push(product.brand);
  });

  filters.segments = Array.from(new Set(filters.segments));
  filters.category = Array.from(new Set(filters.category));
  filters.brand = Array.from(new Set(filters.brand));

  return Response.json({ data: filters });
}
