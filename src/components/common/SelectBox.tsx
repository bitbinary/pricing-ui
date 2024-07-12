import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface SelectBoxProps {
  options: { value: string; label: string }[];
  id: string;
  defaultValue?: string;
  placeHolder?: string;
  value?: string | undefined;
  onValueChange?: (value: any) => void;
}

export const SelectBox = ({
  options,
  id,
  defaultValue,
  placeHolder,
  value,
  onValueChange,
}: SelectBoxProps) => {
  const handleOnValueChange = (value: any) => {
    onValueChange?.({
      id,
      value,
    });
  };

  return (
    <Select
      value={value}
      onValueChange={handleOnValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
