import React from "react";
import Column from "app/components/Column";
import Row from "app/components/Row";
import BuildingTable from "../components/BuildingTable";
import ButtonLink from "app/components/ButtonLink";

const BuildingAdmin: React.FC = () => {
  return (
    <Column>
      <Row sx={{ justifyContent: "flex-end" }}>
        <ButtonLink
          variant="contained"
          to="/zeno/automation/management/building/new"
        >
          Criar
        </ButtonLink>
      </Row>
      <BuildingTable />
    </Column>
  );
};

export default BuildingAdmin;
