import React from "react";

export type FilterData = {
  energy: boolean;
  clim: boolean;
  telecom: boolean;
};

type AutomationFiltersData = {
  building: string;
  floor: string;
  zone: string;
  loop: string;
  groups: {
    energy: boolean;
    clim: boolean;
    telecom: boolean;
  };
  handleFloor(floor: string): void;
  handleBuilding(building: string): void;
  handleZone(zone: string): void;
  handleLoop(loop: string): void;
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
    zone: "",
    loop: "",
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

  const setZone = (zone: string) =>
    setState((prevState) => ({ ...prevState, zone }));

  const setLoop = (loop: string) =>
    setState((prevState) => ({ ...prevState, loop }));

  const toggleEnergyGroup = () => {
    const { energy } = state.groups;
    setState((prevState) => ({
      ...prevState,
      groups: {
        ...state.groups,
        energy: !energy,
      },
    }));
  };

  const toggleClimGroup = () => {
    const { clim } = state.groups;
    setState((prevState) => ({
      ...prevState,
      groups: {
        ...state.groups,
        clim: !clim,
      },
    }));
  };

  const toggleTelecomGroup = () => {
    const { telecom } = state.groups;
    setState((prevState) => ({
      ...prevState,
      groups: {
        ...state.groups,
        telecom: !telecom,
      },
    }));
  };

  return (
    <AutomationFiltersContext.Provider
      value={{
        ...state,
        handleFloor: setFloor,
        handleBuilding: setBuilding,
        handleZone: setZone,
        handleLoop: setLoop,
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
