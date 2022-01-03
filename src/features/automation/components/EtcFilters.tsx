import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export type FilterData = {
  energy: boolean;
  clim: boolean;
  telecom: boolean;
};

type FilterContextData = {
  handleEnergyFilter(): void;
  handleClimFilter(): void;
  handleTelecomFilter(): void;
  filter: FilterData;
};

const FilterContext = React.createContext<FilterContextData>(
  {} as FilterContextData
);

type EtcFiltersProps = {
    filter: FilterData;
    handleEnergyFilter(): void;
    handleClimFilter(): void;
    handleTelecomFilter(): void;
};

export const EtcFiltersProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState<FilterData>({
    energy: true,
    clim: false,
    telecom: false,
  });

  const handleEnergyFilter = () => {
    const { energy } = filter;
    setFilter((prevState) => ({ ...prevState, energy: !energy }));
  };

  const handleClimFilter = () => {
    const { clim } = filter;
    setFilter((prevState) => ({ ...prevState, clim: !clim }));
  };

  const handleTelecomFilter = () => {
    const { telecom } = filter;
    setFilter((prevState) => ({ ...prevState, telecom: !telecom }));
  };

  return (
    <FilterContext.Provider
      value={{
        handleEnergyFilter,
        handleClimFilter,
        handleTelecomFilter,
        filter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const EtcFilters: React.FC<EtcFiltersProps> = (
  {
      handleClimFilter,
      handleEnergyFilter,
      handleTelecomFilter,
      filter,
  }
) => {
//   const { filter, ...methods } = useFilters();

//   console.log(filter)

  return (
      <Box sx={{ display: "flex" }}>
        <Chip
          variant={filter.energy ? "filled" : "outlined"}
          onClick={handleEnergyFilter}
          label="Energia"
        />
        <Chip
          variant={filter.clim ? "filled" : "outlined"}
          onClick={handleClimFilter}
          label="Clima"
          sx={{ ml: 1 }}
        />

        <Chip
          variant={filter.telecom ? "filled" : "outlined"}
          onClick={handleTelecomFilter}
          label="Telecom"
          sx={{ ml: 1 }}
        />
      </Box>
  );
};

export const useFilters = () => React.useContext(FilterContext);

export default EtcFilters;
