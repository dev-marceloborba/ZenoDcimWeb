import ButtonLink from "app/components/ButtonLink";
import Column from "app/components/Column";
import Row from "app/components/Row";
import React from "react";
import FloorTable from "../components/FloorTable";

const FloorAdmin: React.FC = () => {
  return (
    <Column>
      <Row sx={{ justifyContent: "flex-end" }}>
        <ButtonLink
          variant="contained"
          to="/zeno/automation/management/floor/new"
        >
          Criar andar
        </ButtonLink>
      </Row>
      <FloorTable />
    </Column>
  );
};

export default FloorAdmin;
