import React from "react";
import Card from "@mui/material/Card";
import Table from "app/hooks/useTable";
import { FireSystemEvent } from "app/data/fire-system";

type FireSystemEventsProps = {
  events: FireSystemEvent[];
};

const FireSystemEvents: React.FC<FireSystemEventsProps> = ({ events }) => {
  return (
    <Card>
      <Table
        columns={[
          {
            label: "Equipamento",
            name: "equipment",
            align: "left",
          },
          {
            label: "Evento",
            name: "event",
            align: "right",
          },
          {
            label: "Data",
            name: "date",
            align: "right",
          },
        ]}
        rows={events}
      />
    </Card>
  );
};

export default FireSystemEvents;
