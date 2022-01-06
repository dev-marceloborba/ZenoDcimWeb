import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";

// import Table from "app/hooks/useTable";
import Typography from "@mui/material/Typography";
import { DoorControlEvent, EDoorStatus } from "app/data/access-control";

// TODO: replace with some generic table component
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

type AccessControlDoorEventsTableProps = {
  events: DoorControlEvent[];
};

type ColumnProps = {
  label: string;
  name: string;
  align: "inherit" | "left" | "center" | "right" | "justify";
};

const AccessControlDoorEventsTable: React.FC<
  AccessControlDoorEventsTableProps
> = ({ events }) => {
  const columns: ColumnProps[] = [
    {
      label: "Prédio",
      name: "building",
      align: "left",
    },
    {
      label: "Local",
      name: "place",
      align: "right",
    },
    {
      label: "Sala",
      name: "room",
      align: "right",
    },
    {
      label: "Porta",
      name: "door",
      align: "right",
    },
    {
      label: "Data de reconhecimento",
      name: "ackedDate",
      align: "right",
    },
    {
      label: "Status",
      name: "status",
      align: "right",
    },
  ];
  return (
    <Card>
      <Typography variant="h5" sx={{ ml: 2, mt: 1, mb: 1 }}>
        Controle de portas
      </Typography>
      {/* <Table columns={columns} rows={events} /> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.label} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, eventIndex) => (
              <TableRow key={eventIndex}>
                <TableCell align="left">{event.building}</TableCell>
                <TableCell align="right">{event.place}</TableCell>
                <TableCell align="right">{event.room}</TableCell>
                <TableCell align="right">{event.door}</TableCell>
                <TableCell align="right">{event.ackedDate}</TableCell>
                <TableCell align="right">
                  <AccessControlDoorStatus status={event.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default AccessControlDoorEventsTable;

type AccessControlDoorStatusProps = Pick<DoorControlEvent, "status">;

const AccessControlDoorStatus: React.FC<AccessControlDoorStatusProps> = ({
  status,
}) => {
  return (
    <Chip
      label="Aberta"
      color="error"
      sx={{width: 90}}
      {...(status === EDoorStatus.CLOSE && {
        label: "Fechada",
        color: "primary",
      })}
    />
  );
};
