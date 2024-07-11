import { useProductPricing } from "@/contexts/ProductPricing";
import { SelectBox } from "../common/SelectBox";
import { Radios } from "../common/RadioGroup";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  PriceBasedOnOptions,
  PricingAdjustmentIncrementOptions,
  PricingAdjustmentModeOptions,
} from "@/types/Product";

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
          options={ADJUSTMENT_MODE_OPTIONS}
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
          options={ADJUSTMENT_MODE_INCREMENT_OPTIONS}
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
          defaultValue={priceAdjustments.adjustmentValue}
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

const ADJUSTMENT_MODE_OPTIONS = [
  {
    value: PricingAdjustmentModeOptions.FIXED,
    label: "Fixed ($)",
  },
  {
    value: PricingAdjustmentModeOptions.PERCENTAGE,
    label: "Dynamic (%)",
  },
];

const ADJUSTMENT_MODE_INCREMENT_OPTIONS = [
  {
    value: PricingAdjustmentIncrementOptions.INCREASE,
    label: "Increase +",
  },
  {
    value: PricingAdjustmentIncrementOptions.DECREASE,
    label: "Decrease -",
  },
];

const basedOnOptions = [
  {
    value: PriceBasedOnOptions.GLOBAL,
    label: "Global Wholesale Price",
  },
];
