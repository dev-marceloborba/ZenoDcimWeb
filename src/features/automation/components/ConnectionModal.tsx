import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { modalStyle } from "app/styles/modal-style";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

enum ConnectionType {
  PARALEL = 0,
  SERIES = 1,
}

const ConnectionModal: React.FC = () => {
  const [state, setState] = React.useState<ConnectionData[]>(connectionData);

  const handleConnectionChange = (event: any, row: number) => {
    const oldState = [...state];
    oldState.forEach((item, index) => {
      if (row === index) {
        oldState[index].connectionType = event.target.value;
        setState(oldState);
      }
    });
  };
  return (
    <Container maxWidth="md">
      <Box component="form" noValidate autoComplete="off" sx={modalStyle}>
        <Typography variant="h5">Nova conexão</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Tipo de conexão</TableCell>
                <TableCell align="left">Componentes do subsistema</TableCell>
                <TableCell align="left">Sistema</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="right">
                    <TextField
                      variant="standard"
                      select
                      value={data.connectionType}
                      onChange={(event) => handleConnectionChange(event, index)}
                    >
                      <MenuItem value={ConnectionType.SERIES}>Série</MenuItem>
                      <MenuItem value={ConnectionType.PARALEL}>
                        Paralelo
                      </MenuItem>
                    </TextField>
                  </TableCell>
                  <TableCell align="left">
                    {data.subsystemComponents.map((component) =>
                      data.subsystemComponents.length > 1
                        ? `${component} - `
                        : component
                    )}
                  </TableCell>
                  <TableCell align="left">{data.system}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Salvar
        </Button>
      </Box>
    </Container>
  );
};

const getConnectionDescription = (connection: ConnectionType) => {
  switch (connection) {
    case ConnectionType.PARALEL:
      return "Paralelo";
    case ConnectionType.SERIES:
      return "Série";
  }
};

type ConnectionData = {
  connectionType: ConnectionType;
  subsystemComponents: string[];
  system: string;
};

const connectionData: ConnectionData[] = [
  {
    connectionType: ConnectionType.PARALEL,
    subsystemComponents: ["PDU XYZ", "RPP XYZ"],
    system: "Subsistema 3",
  },
  {
    connectionType: ConnectionType.PARALEL,
    subsystemComponents: ["THRD125"],
    system: "Subsistema 2",
  },
  {
    connectionType: ConnectionType.SERIES,
    subsystemComponents: ["THRD125"],
    system: "Subsistema 3",
  },
];

export default ConnectionModal;
