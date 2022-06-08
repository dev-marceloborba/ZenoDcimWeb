import React, { useState, useEffect } from "react";
import { AutomationFilterStateProps } from "modules/automation/data/types/automationFilter";
import AutomationFiltersContext from "../contexts/automationFiltersContext";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";

const AutomationFiltersProvider: React.FC = ({ children }) => {
  const { data } = useFindAllBuildingsQuery();

  const [state, setState] = useState<AutomationFilterStateProps>({
    building: "",
    buildings: [],
    floor: "",
    room: "",
    zone: "",
    loop: "",
    groups: {
      energy: true,
      clim: false,
      telecom: false,
    },
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, buildings: data }));
  }, [data]);

  const setBuilding = (building: string) =>
    setState((prevState) => ({ ...prevState, building }));

  const setFloor = (floor: string) =>
    setState((prevState) => ({ ...prevState, floor }));

  const setRoom = (room: string) =>
    setState((prevState) => ({ ...prevState, room }));

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
        handleBuilding: setBuilding,
        handleFloor: setFloor,
        handleRoom: setRoom,
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
