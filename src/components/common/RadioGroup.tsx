import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const Radios = ({
  id,
  options,
  defaultValue = "single",
  onValueChange,
}: {
  id: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onValueChange?: (value: any) => void;
}) => {
  const handleValueChange = (value: any) => {
    onValueChange?.({
      id,
      value,
    });
  };
  return (
    <RadioGroup
      id={id}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
    >
      <div className="flex items-center space-x-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};
