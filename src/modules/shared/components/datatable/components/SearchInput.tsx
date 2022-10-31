import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, setValue }) => {
  return (
    <TextField
      name="searchTable"
      variant="standard"
      label="Procurar..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{ flex: "1 1 100%" }}
    />
  );
};

export default SearchInput;
