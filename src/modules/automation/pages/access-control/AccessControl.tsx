import React, { useState, useEffect } from "react";
import FloorDropdown from "modules/automation/components/FloorDropdown";
import AutoCompleteDropdown from "modules/shared/components/AutocompleteDropdown";
import AccessControlEventsTable from "modules/automation/components/AccessControlEventsTable";
import AccessControlDoorEventsTable from "modules/automation/components/AccessControlDoorStatusTable";
import {
  accessControl,
  AccessEvent,
  DoorControlEvent,
} from "app/data/access-control";

import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import Column from "modules/shared/components/Column";
import BuildingDropdown from "modules/automation/components/BuildingDropdown";
import useAutomationFilters from "modules/automation/data/hooks/useAutomationFilters";

const AccessControl: React.FC = () => {
  const { accessEvents, doorControlEvents } = accessControl;
  const { floor } = useAutomationFilters();

  const [filteredAccessEvents, setFilteredAccessEvents] = useState<
    AccessEvent[]
  >([...accessEvents]);

  const [filteredDoorControlEvents, setFilteredDoorControlEvents] = useState<
    DoorControlEvent[]
  >([...doorControlEvents]);

  console.log(accessControl);
  console.log(accessEvents);

  const [user, setUser] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  // useEffect(() => {
  //   const events =
  //     floor === "Todos"
  //       ? accessEvents
  //       : accessEvents.filter((event) => event.place === floor);

  //   const eventsByUser = user
  //     ? events.filter((event) => event.name === user)
  //     : events;
  //   setFilteredAccessEvents(eventsByUser);
  // }, [floor, accessEvents, user]);

  // useEffect(() => {
  //   const events =
  //     floor === "Todos"
  //       ? doorControlEvents
  //       : doorControlEvents.filter((event) => event.place === floor);
  //   setFilteredDoorControlEvents(events);
  // }, [floor, doorControlEvents]);

  return (
    <HeroContainer title="Controle de acesso">
      <Row sx={{ alignItems: "center", mt: 2 }}>
        <BuildingDropdown sx={{ maxWidth: "280px" }} />
        <FloorDropdown sx={{ maxWidth: "280px", ml: 2 }} />
        <AutoCompleteDropdown
          name="user"
          label="Usuário"
          sx={{ width: 300, ml: 2 }}
          options={users}
          value={user}
          handleValue={setUser}
          inputValue={inputValue}
          handleInputValue={setInputValue}
        />
      </Row>
      <AccessControlEventsTable events={filteredAccessEvents} />
      <Column sx={{ mt: 4 }}>
        <AccessControlDoorEventsTable events={filteredDoorControlEvents} />
      </Column>
    </HeroContainer>
  );
};

export default AccessControl;

const users = [
  "Marcelo Borba",
  "Linus Schuster",
  "Gustavo Dal Molin",
  "Benhur Branco",
];
