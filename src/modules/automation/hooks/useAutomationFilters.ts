import {
  buildingSelector,
  buildingsSelector,
  floorSelector,
  roomSelector,
  groupSelector,
  setBuilding,
  setFloor,
  setRoom,
  toggleClim,
  toggleEnergy,
  toggleTelecom,
} from "modules/automation/stores/slices/AutomationFilterSlice";

import {
  useAutomationDispatch,
  useAutomationSelector,
} from "modules/automation/hooks/automationHooks";

export const useAutomationFilters = () => {
  const dispatch = useAutomationDispatch();

  const building = useAutomationSelector(buildingSelector);
  const buildings = useAutomationSelector(buildingsSelector);
  const floor = useAutomationSelector(floorSelector);
  const room = useAutomationSelector(roomSelector);
  const groups = useAutomationSelector(groupSelector);

  const defineBuilding = (building: string) =>
    dispatch(setBuilding({ building }));
  const defineFloor = (floor: string) => dispatch(setFloor({ floor }));
  const defineRoom = (room: string) => dispatch(setRoom({ room }));

  const toogleEnergyGroup = () => dispatch(toggleEnergy());
  const toogleClimGroup = () => dispatch(toggleClim());
  const toogleTelecomGroup = () => dispatch(toggleTelecom());

  return {
    building,
    buildings,
    floor,
    room,
    groups,
    defineBuilding,
    defineFloor,
    defineRoom,
    toogleEnergyGroup,
    toogleClimGroup,
    toogleTelecomGroup,
  };
};
