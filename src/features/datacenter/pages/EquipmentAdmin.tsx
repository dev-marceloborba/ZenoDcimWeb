import React from "react";
import ButtonLink from "app/components/ButtonLink";
import Column from "app/components/Column";
import Row from "app/components/Row";
import EquipmentTable from "../components/EquipmentTable";

const EquipmentAdmin: React.FC = () => {
  return (
    <Column>
      <Row sx={{ justifyContent: "flex-end" }}>
        <ButtonLink
          variant="contained"
          to="/zeno/automation/management/equipment/new"
        >
          Criar
        </ButtonLink>
      </Row>
      <EquipmentTable />
    </Column>
  );
};

export default EquipmentAdmin;
