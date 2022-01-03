import React from "react";

type AutomationFiltersData = {
  building: string;
  floor: string;
  groups: {
    energy: boolean;
    clim: boolean;
    telecom: boolean;
  };
  handleFloor(floor: string): void;
  handleBuilding(floor: string): void;
  handleToggleEnergyGroup(): void;
  handleToggleClimGroup(): void;
  handleToggleTelecomGroup(): void;
};

export const AutomationFiltersContext =
  React.createContext<AutomationFiltersData>({} as AutomationFiltersData);

const AutomationFiltersProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState({
    building: "",
    floor: "",
    groups: {
      energy: true,
      clim: false,
      telecom: false,
    },
  });

  const setFloor = (floor: string) =>
    setState((prevState) => ({ ...prevState, floor }));
  const setBuilding = (building: string) =>
    setState((prevState) => ({ ...prevState, building }));

  const toggleEnergyGroup = () => {
    const { energy } = state.groups;
    setState((prevState) => ({ ...prevState, energy: !energy }));
  };

  const toggleClimGroup = () => {
    const { clim } = state.groups;
    setState((prevState) => ({ ...prevState, clim: !clim }));
  };

  const toggleTelecomGroup = () => {
    const { telecom } = state.groups;
    setState((prevState) => ({ ...prevState, telecom: !telecom }));
  };

  return (
    <AutomationFiltersContext.Provider
      value={{
        ...state,
        handleFloor: setFloor,
        handleBuilding: setBuilding,
        handleToggleClimGroup: toggleClimGroup,
        handleToggleEnergyGroup: toggleEnergyGroup,
        handleToggleTelecomGroup: toggleTelecomGroup,
      }}
    >
      {children}
    </AutomationFiltersContext.Provider>
  );
};

export default AutomationFiltersProvider;

export const useAutomationFilters = () =>
  React.useContext(AutomationFiltersContext);
