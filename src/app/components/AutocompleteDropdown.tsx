import React from "react";
import AutoComplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material";

type AutoCompleteDropdownProps = {
  options: any[];
  sx?: SxProps<Theme>;
  label: string;
  name: string;
};

const AutoCompleteDropdown: React.FC<AutoCompleteDropdownProps> = ({
  options,
  sx,
  label,
  name,
}) => {
  return (
    <AutoComplete
      disablePortal
      id={name}
      options={options}
      noOptionsText="Resultado não encontrado"
      sx={sx}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default AutoCompleteDropdown;
