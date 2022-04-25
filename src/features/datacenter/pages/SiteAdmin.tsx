import React from "react";
import Column from "app/components/Column";
import Row from "app/components/Row";
import ButtonLink from "app/components/ButtonLink";
import SiteTable from "../components/SiteTable";

const SiteAdmin: React.FC = () => {
  return (
    <Column>
      <Row sx={{ justifyContent: "flex-end" }}>
        <ButtonLink
          variant="contained"
          to="/zeno/automation/management/site/new"
        >
          Criar site
        </ButtonLink>
      </Row>
      <SiteTable />
    </Column>
  );
};

export default SiteAdmin;
