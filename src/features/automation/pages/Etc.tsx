import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import EquipmentCard from "../components/EquipmentCard";
import PageTitle from "app/components/PageTitle";
import RoomCard from "../components/RoomCard";
import ButtonLink from "app/components/ButtonLink";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import EtcFilters from "../components/EtcFilters";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";
import Center from "app/components/Center";
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";
import { EEquipmentStatus, EParameterStatus } from "app/types/bms";
import { RoomResponse } from "app/models/data-center.model";
import { useSubscription } from "mqtt-react-hooks";

const Etc: React.FC = () => {
  const { groups, buildings, building, floor } = useAutomationFilters();
  const { message: mqttMessage } = useSubscription(["/Rack DH01.2CG01.A02"]);

  const rooms = useMemo(
    () =>
      buildings
        ?.find((x) => x.id === building)
        ?.floors?.find((x) => x.id === floor)?.rooms ?? [],
    [building, buildings, floor]
  );

  function getRealtimeValue(equipmentMqttId: string, variable: string) {
    if (mqttMessage) {
      const { topic, message } = mqttMessage;

      if (`/${equipmentMqttId}` === topic && message) {
        const data = JSON.parse(message as string);
        const keys = Object.keys(data ?? "");
        if (keys.includes(variable)) {
          return data[variable];
        }
      }
    }
  }

  return (
    <HeroContainer>
      <PageTitle>Energia, Clima e Telecom</PageTitle>
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Row sx={{ width: "640px" }}>
          <BuildingDropdown />
          <FloorDropdown sx={{ ml: 2 }} />
        </Row>
        <EtcFilters />
      </Row>
      <Grid sx={{ mt: 1 }} container spacing={1}>
        {rooms?.map((room: RoomResponse, index) => (
          <Grid key={index} item md={6}>
            <RoomCard title={room.name}>
              <Grid container spacing={1} justifyContent="space-between">
                {room.equipments?.map((equipment, index) => {
                  return (
                    <Grid key={index}>
                      {/* <EquipmentCard {...equipment} {...groups} /> */}
                      <EquipmentCard
                        name={equipment.component}
                        status={EEquipmentStatus.ONLINE}
                        mainEquipment={true}
                        groupName="Energia"
                        informations={
                          equipment.equipmentParameters?.map((parameter) => ({
                            description: parameter.name,
                            parameterStatus: EParameterStatus.NORMAL,
                            unit: parameter.unit,
                            value: getRealtimeValue(
                              equipment.component,
                              parameter.name
                            ),
                          })) ?? []
                        }
                        {...groups}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Center>
                <ButtonLink
                  to={`/zeno/automation/etc/details/${room.id}`}
                  sx={{ mt: 1 }}
                >
                  Ver mais
                </ButtonLink>
              </Center>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </HeroContainer>
  );
};

export default Etc;
