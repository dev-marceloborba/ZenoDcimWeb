import { useState } from "react";
import AutoComplete from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type AutoCompleteProps = Pick<TextFieldProps, "fullWidth" | "sx">;

type AutoCompleteDropdownProps = {
  label: string;
  options: Option[];
} & AutoCompleteProps;

type Option = {
  id: number;
  label: string;
};

const AutoCompleteDropdown: React.FC<AutoCompleteDropdownProps> = ({
  label,
  options,
  ...props
}) => {
  const [value, setValue] = useState<Option | null>(options[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <AutoComplete
      disablePortal
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={value}
      onChange={(_, v) => setValue(v)}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      renderInput={(params) => <TextField {...params} label={label} />}
      {...props}
    />
  );
};

export default AutoCompleteDropdown;
