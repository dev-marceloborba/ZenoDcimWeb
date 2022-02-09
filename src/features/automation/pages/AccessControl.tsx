import React from "react";
import PageTitle from "app/components/PageTitle";
import FloorDropdown from "../components/FloorDropdown";
import AutoCompleteDropdown from "app/components/AutocompleteDropdown";
import AccessControlEventsTable from "../components/AccessControlEventsTable";
import AccessControlDoorEventsTable from "../components/AccessControlDoorStatusTable";
import {
  accessControl,
  AccessEvent,
  DoorControlEvent,
} from "app/data/access-control";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";
import Column from "app/components/Column";

const AccessControl: React.FC = () => {
  const { accessEvents, doorControlEvents } = accessControl;
  const { floor } = useAutomationFilters();

  const [filteredAccessEvents, setFilteredAccessEvents] = React.useState<
    AccessEvent[]
  >([...accessEvents]);

  const [filteredDoorControlEvents, setFilteredDoorControlEvents] =
    React.useState<DoorControlEvent[]>([...doorControlEvents]);

  const [user, setUser] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const events =
      floor === "Todos"
        ? accessEvents
        : accessEvents.filter((event) => event.place === floor);

    const eventsByUser = user
      ? events.filter((event) => event.name === user)
      : events;
    setFilteredAccessEvents(eventsByUser);
  }, [floor, accessEvents, user]);

  React.useEffect(() => {
    const events =
      floor === "Todos"
        ? doorControlEvents
        : doorControlEvents.filter((event) => event.place === floor);
    setFilteredDoorControlEvents(events);
  }, [floor, doorControlEvents]);

  return (
    <HeroContainer>
      <PageTitle>Controle de acesso</PageTitle>
      <Row sx={{ alignItems: "center", mt: 2 }}>
        <FloorDropdown sx={{ maxWidth: "280px" }} />
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

// const users = [
//   {
//     label: "Marcelo Borba",
//     id: 1,
//   },
//   {
//     label: "Linus Schuster",
//     id: 2,
//   },
//   {
//     label: "Gustavo Dal Molin",
//     id: 3,
//   },
//   {
//     label: "Benhur Branco",
//     id: 4,
//   },
// ];

const users = [
  "Marcelo Borba",
  "Linus Schuster",
  "Gustavo Dal Molin",
  "Benhur Branco",
];
