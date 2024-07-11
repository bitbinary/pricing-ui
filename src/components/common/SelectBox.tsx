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
  onValueChange?: (value: any) => void;
}

export const SelectBox = ({
  options,
  id,
  defaultValue,
  placeHolder,
  onValueChange,
}: SelectBoxProps) => {
  const handleOnValueChange = (value: any) => {
    onValueChange?.({
      id,
      value,
    });
  };

  return (
    <Select onValueChange={handleOnValueChange} defaultValue={defaultValue}>
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
