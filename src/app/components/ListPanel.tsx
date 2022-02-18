import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Table from "app/hooks/useTable";

import { readFile, exportFile } from "app/utils/excel.handler";
import ImportButton from "./ImportButton";
import ButtonLink from "./ButtonLink";

type ColumnProps = {
  name: string;
  label: string;
  align: "left" | "right";
};

export type ListPanelProps = {
  newActionLabel: string;
  newActionLink: string;
  columns: ColumnProps[];
  rows?: any;
};

const ListPanel: React.FC<ListPanelProps> = (props) => {
  const handleFileChange = async (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      const result = (await readFile(files[0])) as Array<any>;
      console.log(result);
      result.forEach((value) => {
        // console.log(value[0])
        // console.log(value[1])
        // console.log(value[2])
        // console.log(value[3])
        // console.log(value[4])
      });
    }
  };

  const handleExport = () => {
    exportFile(props.columns, props.rows, "Modbus Tags", "modbustags");
  };

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonLink to={props.newActionLink} variant="contained">
          {props.newActionLabel}
        </ButtonLink>
        <ImportButton sx={{ ml: 1 }} callback={(data) => console.log(data)} />
        <Button variant="contained" sx={{ ml: 1 }} onClick={handleExport}>
          Exportar
        </Button>
      </Box>
      <Table
        columns={props.columns}
        rows={props.rows ?? null}
        showActions
        editPage="/zeno/clp/edit"
        handleDelete={(data: any) => console.log(data)}
      />
    </Container>
  );
};

export default ListPanel;
