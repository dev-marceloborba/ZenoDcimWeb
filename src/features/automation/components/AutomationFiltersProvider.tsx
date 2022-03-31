import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BuildingsResponse,
  useListBuildingsQuery,
} from "app/services/datacenter";

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
  // buildings: ItemProps[] | null;
  buildings: BuildingsResponse | undefined;
};

export const AutomationFiltersContext = createContext<AutomationFiltersData>(
  {} as AutomationFiltersData
);

type AutomationFilterStateProps = {
  building: string;
  floor: string;
  zone: string;
  loop: string;
  groups: FilterData;
  // buildings: ItemProps[] | null;
  buildings: BuildingsResponse | undefined;
};

const AutomationFiltersProvider: React.FC = ({ children }) => {
  const { data } = useListBuildingsQuery();

  const [state, setState] = useState<AutomationFilterStateProps>({
    building: "",
    buildings: [],
    floor: "",
    zone: "",
    loop: "",
    groups: {
      energy: true,
      clim: false,
      telecom: false,
    },
  });

  useEffect(() => {
    // setState((prevState) => ({
    //   ...prevState,
    //   buildings:
    //     data?.map<ItemProps>((building) => ({
    //       label: building.name,
    //       value: building.id,
    //     })) ?? [],
    // }));
    setState((prevState) => ({ ...prevState, buildings: data }));
  }, [data]);

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

export const useAutomationFilters = () => useContext(AutomationFiltersContext);
