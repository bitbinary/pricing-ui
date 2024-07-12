import { sql } from "@vercel/postgres";

import { SearchResultsDTO } from "./dto";
import { searchProductBySKU, searchProductByTitle } from "./helpers";
import { IProduct } from "@/types/Product";
/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Return the products based on the search criteria
 *     parameters:
 *       - in: query
 *         name: searchString
 *         schema:
 *           type: string
 *         description: The search string to filter products by title
 *       - in: query
 *         name: productOrsku
 *         schema:
 *           type: string
 *         description: The search string to filter products by SKU
 *       - in: query
 *         name: segment
 *         schema:
 *           type: string
 *         description: The segment ID to filter products by segment
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category ID to filter products by category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: The brand name to filter products by brand
 *     responses:
 *       200:
 *         description: return array of products
 */
export async function GET(req: Request, res: Response) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const searchString = params.get("searchString");
  const productOrsku = params.get("productOrsku");
  const segment = params.get("segment");
  const category = params.get("category");
  const brand = params.get("brand");
  const { rows: Products } = await sql`SELECT * FROM public."Products"`;

  let data = Products as IProduct[];

  if (searchString) {
    data = searchProductByTitle(data, searchString);
  }
  if (productOrsku) {
    data = searchProductBySKU(data, productOrsku);
  }

  if (segment) {
    data = data.filter((product) => product.segmentId === segment);
  }
  if (category) {
    data = data.filter((product) => product.categoryId === category);
  }
  if (brand) {
    data = data.filter((product) => product.brand === brand);
  }

  const result = SearchResultsDTO(data);

  return Response.json({ data: result });
}
