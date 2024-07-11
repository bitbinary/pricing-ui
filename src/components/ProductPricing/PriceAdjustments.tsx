import { useProductPricing } from "@/contexts/ProductPricing";
import { SelectBox } from "../common/SelectBox";
import { Radios } from "../common/RadioGroup";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const PriceAdjustments = () => {
  const { priceAdjustments, setPriceAdjustments } = useProductPricing();

  const onValueChange = ({ id, value }: { id: string; value: string }) => {
    setPriceAdjustments({
      ...priceAdjustments,
      [id]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-muted-foreground">Based on</Label>
        <SelectBox
          options={basedOnOptions}
          id="baseOn"
          placeHolder="Based On Price"
          onValueChange={onValueChange}
          defaultValue={priceAdjustments.baseOn}
        />
      </div>
      <div>
        <Label className="text-muted-foreground">
          Set Price Adjustment Mode
        </Label>
        <Radios
          options={PricingAdjustmentModeOptions}
          id="mode"
          onValueChange={onValueChange}
          defaultValue={priceAdjustments.mode}
        />
      </div>
      <div>
        <Label className="text-muted-foreground">
          Set Price Adjustment Increment Mode
        </Label>
        <Radios
          options={PricingAdjustmentIncrementOptions}
          id="incrementMode"
          onValueChange={onValueChange}
          defaultValue={priceAdjustments.incrementMode}
        />
      </div>

      <div>
        <Label className="text-muted-foreground">
          Set Price Adjustment Value
        </Label>
        <Input
          id="adjustmentValue"
          type="number"
          placeholder="Price Adjustment Value"
          defaultValue={0}
          onChange={(e) => {
            const value = e.target.value;
            setPriceAdjustments({
              ...priceAdjustments,
              adjustmentValue: value ? Number(parseFloat(value).toFixed(4)) : 0,
            });
          }}
        />
      </div>

      <div>
        <Label className="text-muted-foreground">
          The adjusted price will be calculated from Based on Price selected
          above
        </Label>
      </div>
    </div>
  );
};

const PricingAdjustmentModeOptions = [
  {
    value: "fixed",
    label: "Fixed ($)",
  },
  {
    value: "dynamic",
    label: "Dynamic (%)",
  },
];

const PricingAdjustmentIncrementOptions = [
  {
    value: "increase",
    label: "Increase +",
  },
  {
    value: "decrease",
    label: "Decrease -",
  },
];

const basedOnOptions = [
  {
    value: "global",
    label: "Global Wholesale Price",
  },
];
