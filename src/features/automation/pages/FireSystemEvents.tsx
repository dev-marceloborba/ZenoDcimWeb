import React from "react";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import ZoneDropdown from "../components/ZoneDropdown";
import LoopDropdown from "../components/LoopDropdown";
import FireSytemEventsTable from "../components/FireSystemEventsTable";
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";

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
