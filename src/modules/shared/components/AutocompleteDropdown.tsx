import React from "react";
import AutoComplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material";

type AutoCompleteDropdownProps = {
  options: any[];
  sx?: SxProps<Theme>;
  label: string;
  name: string;
  value: string | null;
  handleValue(value: string | null): void;
  inputValue: string;
  handleInputValue(inputValue: string): void;
};

const AutoCompleteDropdown: React.FC<AutoCompleteDropdownProps> = ({
  options,
  sx,
  label,
  name,
  value,
  handleValue,
  inputValue,
  handleInputValue,
}) => {
  return (
    <AutoComplete
      disablePortal
      value={value}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        handleInputValue(newInputValue);
      }}
      onChange={(_, newValue: string | null) => {
        handleValue(newValue);
      }}
      id={name}
      options={options}
      noOptionsText="Resultado não encontrado"
      sx={sx}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default AutoCompleteDropdown;
