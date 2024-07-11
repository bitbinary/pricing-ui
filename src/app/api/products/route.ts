import { PRODUCTS } from "../../data/sampleData";
import { SearchResultsDTO } from "./dto";
import { searchProductBySKU, searchProductByTitle } from "./helpers";

export async function GET(req: Request, res: Response) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const searchString = params.get("searchString");
  const productOrsku = params.get("productOrsku");
  const segment = params.get("segment");
  const category = params.get("category");
  const brand = params.get("brand");

  let data = PRODUCTS;

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
