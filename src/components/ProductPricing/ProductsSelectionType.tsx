import { useProductPricing } from "@/contexts/ProductPricing";
import { Radios } from "../common/RadioGroup";
import { Label } from "../ui/label";
import { ProductsSelectionTypes } from "@/types/Product";

const ProductsSelectionTypeOptions = [
  {
    value: ProductsSelectionTypes.SINGLE,
    label: "One Product",
  },
  {
    value: ProductsSelectionTypes.MULTIPLE,
    label: "Multiple Products",
  },
  {
    value: ProductsSelectionTypes.ALL,
    label: "All Product",
  },
];

export const ProductsSelectionType = () => {
  const {
    setProductsSelectionType,
    productsSelectionType,
    setProductsSearchValues,
  } = useProductPricing();
  const onValueChange = ({
    value,
    id,
  }: {
    id: string;
    value: ProductsSelectionTypes;
  }) => {
    setProductsSelectionType(value);
    if (value === ProductsSelectionTypes.ALL) {
      setProductsSearchValues({});
    }
  };
  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground ">
        You are creating a Pricing Profile for
      </Label>
      <div className="flex items-center space-x-4">
        <Radios
          id="products-selection-type"
          options={ProductsSelectionTypeOptions}
          defaultValue={productsSelectionType}
          onValueChange={onValueChange}
          value={productsSelectionType}
        />
      </div>
    </div>
  );
};
