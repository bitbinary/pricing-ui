import { useProductPricing } from "@/contexts/ProductPricing";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SelectBox } from "../common/SelectBox";
import { useMemo } from "react";
import { ProductsSelectionTypes } from "@/types/Product";

const generateOptions = (options: string[]) => {
  let generatedOptions = [
    {
      label: "Select",
      value: "Select",
    },
  ];
  generatedOptions.push(
    ...options.map((option) => ({
      label: option,
      value: option,
    }))
  );
  return generatedOptions;
};

export const ProductsSearchBar = () => {
  const {
    productsSelectionType,
    productsSearchValues,
    setProductsSearchValues,
    filters: {
      segments: segmentOptions,
      category: categoryOptions,
      brand: BrandOptions,
    },
  } = useProductPricing();

  const filters = useMemo(() => {
    return {
      segments: generateOptions(segmentOptions),
      category: generateOptions(categoryOptions),
      brand: generateOptions(BrandOptions),
    };
  }, [segmentOptions, categoryOptions, BrandOptions]);

  if (productsSelectionType === ProductsSelectionTypes.ALL) {
    return null;
  }

  const onValueChange = ({ id, value }: { id: string; value: string }) => {
    if (value === "Select") {
      setProductsSearchValues({
        ...productsSearchValues,
        [id]: undefined,
      });
    } else
      setProductsSearchValues({
        ...productsSearchValues,
        [id]: value,
      });
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductsSearchValues({
      ...productsSearchValues,
      searchString: e.target.value,
    });
  };
  const handleProductOrskuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductsSearchValues({
      ...productsSearchValues,
      productOrsku: e.target.value,
    });
  };

  return (
    <div>
      <Label htmlFor="search" className="text-sm text-muted-foreground ">
        Search for Products
      </Label>
      <div className="flex space-x-4 mt-2">
        <Input
          id="searchString"
          placeholder="Search"
          onChange={handleSearchInputChange}
        />
        <Input
          id="productOrsku"
          placeholder="Product / SKU"
          onChange={handleProductOrskuChange}
        />
        <SelectBox
          options={filters.category}
          id="category"
          placeHolder="Category"
          onValueChange={onValueChange}
        />
        <SelectBox
          options={filters.segments}
          id="segment"
          placeHolder="Segment"
          onValueChange={onValueChange}
        />
        <SelectBox
          options={filters.brand}
          id="brand"
          placeHolder="Brand"
          onValueChange={onValueChange}
        />
      </div>
    </div>
  );
};
