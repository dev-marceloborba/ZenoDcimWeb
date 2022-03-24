import React from "react";
import ButtonLink from "app/components/ButtonLink";
import Column from "app/components/Column";
import Row from "app/components/Row";
import RoomTable from "../components/RoomTable";

const RoomAdmin: React.FC = () => {
  return (
    <Column>
      <Row sx={{ justifyContent: "flex-end" }}>
        <ButtonLink
          variant="contained"
          to="/zeno/automation/management/room/new"
        >
          Criar sala
        </ButtonLink>
      </Row>
      <RoomTable />
    </Column>
  );
};

export default RoomAdmin;
