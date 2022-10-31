import React from "react";
import Card from "@mui/material/Card";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import { FireSystemEvent } from "app/data/fire-system";

type FireSystemEventsProps = {
  events: FireSystemEvent[];
};

const FireSystemEvents: React.FC<FireSystemEventsProps> = ({ events }) => {
  return (
    <Card>
      <DataTable title="Eventos de incêndio" columns={columns} rows={events} />
    </Card>
  );
};

export default FireSystemEvents;

const columns: ColumnHeader[] = [
  {
    label: "Equipamento",
    name: "equipment",
  },
  {
    label: "Evento",
    name: "event",
  },
  {
    label: "Data",
    name: "date",
  },
];
