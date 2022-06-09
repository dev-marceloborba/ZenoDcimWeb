import React from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import PageTitle from "modules/shared/components/PageTitle";
import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

type RuleRegisterData = {
  parameter: string;
  condition: string;
  conditional1: string;
  conditional2: string;
  graphication: "circle" | "line" | "square" | "triangle";
  color: string;
  user: string;
};

const RuleRegister: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Cadastro de regras</PageTitle>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parâmetro</TableCell>
              <TableCell>Condição</TableCell>
              <TableCell>Condicional 1</TableCell>
              <TableCell>Condicional 2</TableCell>
              <TableCell>Graficação</TableCell>
              <TableCell>Cor (RGB)</TableCell>
              <TableCell>Usuário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ruleRegisterData.map((rule) => (
              <TableRow key={rule.parameter}>
                <TableCell>{rule.parameter}</TableCell>
                <TableCell>{rule.condition}</TableCell>
                <TableCell>{rule.conditional1}</TableCell>
                <TableCell>{rule.conditional2}</TableCell>
                <TableCell>{rule.graphication}</TableCell>
                <TableCell>{rule.color}</TableCell>
                <TableCell>{rule.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </HeroContainer>
  );
};

const ruleRegisterData: RuleRegisterData[] = [
  {
    parameter: "Tensão",
    condition: "Maior que",
    conditional1: "LMT MIN",
    conditional2: "LMT MAX",
    graphication: "line",
    color: "rgb(255, 0, 0)",
    user: "admin",
  },
  {
    parameter: "Corrente",
    condition: "Menor que",
    conditional1: "LMT MIN",
    conditional2: "LMT MAX",
    graphication: "square",
    color: "rgb(255, 0, 0)",
    user: "admin",
  },
];

export default RuleRegister;
