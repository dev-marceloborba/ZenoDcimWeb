import React from "react";
import Column from "app/components/Column";
import FloorTable from "modules/automation/pages/floor-admin/components/floor-table/FloorTable";

const FloorAdmin: React.FC = () => {
  return (
    <Column>
      <FloorTable />
    </Column>
  );
};

export default FloorAdmin;
