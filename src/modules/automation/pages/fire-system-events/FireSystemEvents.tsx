import React from "react";
import PageTitle from "modules/shared/components/PageTitle";
import Row from "modules/shared/components/Row";
import BuildingDropdown from "modules/automation/components/BuildingDropdown";
import FloorDropdown from "modules/automation/components/FloorDropdown";
import ZoneDropdown from "modules/automation/components/ZoneDropdown";
import LoopDropdown from "modules/automation/components/LoopDropdown";
import FireSytemEventsTable from "modules/automation/components/FireSystemEventsTable";
import HeroContainer from "modules/shared/components/HeroContainer";

const FireSystemEvents: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Incêndio - Eventos</PageTitle>

      <Row sx={{ mt: 2 }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 1, mr: 1 }} />
        <ZoneDropdown sx={{ mr: 1 }} />
        <LoopDropdown />
      </Row>

      <Row sx={{ width: "100%", mt: 2 }}>
        <FireSytemEventsTable />
      </Row>
    </HeroContainer>
  );
};

export default FireSystemEvents;
