import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";

import ReactFlow from "react-flow-renderer";

const elements = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 5 },
    // sourcePosition: "right",
    type: "input",
  },
  // you can also pass a React component as a label
  {
    id: "2",
    data: {
      label: <div>Switch Core XXX 500Mpbs</div>,
    },
    position: { x: 250, y: 8 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  { id: "e1-2", source: "1", target: "2", animated: false },
];

const RackEquipmentConnectivity: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Conectividade de equipamento</PageTitle>
      <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
        <BuildingDropdown />
        <FloorDropdown />
      </Box>

      <Typography variant="h4">Telecomunicações</Typography>

      <Box sx={{ width: "600px", height: "600px" }}>
        <ReactFlow
          elements={elements}
          elementsSelectable={false}
          nodesDraggable={false}
          nodesConnectable={false}
          paneMoveable={false}
        />
      </Box>
    </Container>
  );
};

export default RackEquipmentConnectivity;
