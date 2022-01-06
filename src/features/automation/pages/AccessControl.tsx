import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
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

const AccessControl: React.FC = () => {
  const { accessEvents, doorControlEvents } = accessControl;
  const { floor } = useAutomationFilters();

  const [filteredAccessEvents, setFilteredAccessEvents] = React.useState<
    AccessEvent[]
  >([...accessEvents]);

  const [filteredDoorControlEvents, setFilteredDoorControlEvents] =
    React.useState<DoorControlEvent[]>([...doorControlEvents]);

  React.useEffect(() => {
    const events =
      floor === "Todos"
        ? accessEvents
        : accessEvents.filter((event) => event.place === floor);
    setFilteredAccessEvents(events);
  }, [floor, accessEvents]);

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Controle de acesso</PageTitle>

      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <FloorDropdown sx={{ maxWidth: "280px" }} />
        <AutoCompleteDropdown
          name="user"
          label="Usuário"
          sx={{ width: 300, ml: 2 }}
          options={users}
        />
      </Box>

      <AccessControlEventsTable events={filteredAccessEvents} />
      <Box sx={{ mt: 4 }}>
        <AccessControlDoorEventsTable events={filteredDoorControlEvents} />
      </Box>
    </Container>
  );
};

export default AccessControl;

const users = [
  {
    label: "Marcelo Borba",
    id: 1,
  },
  {
    label: "Linus Schuster",
    id: 2,
  },
  {
    label: "Gustavo Dal Molin",
    id: 3,
  },
  {
    label: "Benhur Branco",
    id: 4,
  },
];
