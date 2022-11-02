import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import EquipmentCard from "modules/automation/components/EquipmentCard";
import PageTitle from "modules/shared/components/PageTitle";
import EtcFilters from "modules/automation/components/EtcFilters";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import Loading from "modules/shared/components/Loading";
import { EEquipmentStatus, EParameterStatus } from "app/types/bms";
import useAutomationFilters from "modules/automation/data/hooks/useAutomationFilters";
import { useFindRoomByIdMutation } from "modules/datacenter/services/room-service";
import { EquipmentModel } from "modules/automation/models/automation-model";

const EtcDetails: React.FC = () => {
  const { groups } = useAutomationFilters();
  const [equipments, setEquipments] = useState<EquipmentModel[]>([]);
  const [findRoom, { isLoading }] = useFindRoomByIdMutation();

  // room id
  const { id } = useParams();

  useEffect(() => {
    async function fetchEquipments() {
      if (id) {
        const r = await findRoom(id).unwrap();
        setEquipments(r.equipments ?? []);
      }
    }
    fetchEquipments();
  }, [findRoom, id]);

  return (
    <HeroContainer>
      <Row sx={{ justifyContent: "space-between" }}>
        <PageTitle>Energia, Clima e Telecom</PageTitle>
        <Row sx={{}}>
          <PageTitle>Sala 1</PageTitle>
          <PageTitle sx={{ ml: 2 }}>Data Hall</PageTitle>
        </Row>
      </Row>
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EtcFilters />
      </Row>
      <Grid sx={{ mt: 2 }} container>
        {equipments?.map((equipment, index) => (
          <Grid key={index} item md={6}>
            {/* <EquipmentCard {...equipment} {...groups} showGroupTitle /> */}
            <EquipmentCard
              name={equipment.component}
              status={EEquipmentStatus.ONLINE}
              informations={
                equipment.equipmentParameters?.map((parameter) => ({
                  description: parameter.name,
                  unit: parameter.unit,
                  parameterStatus: EParameterStatus.NORMAL,
                  value: 0,
                })) ?? []
              }
              groupName="Energia"
              {...groups}
              showGroupTitle
            />
          </Grid>
        ))}
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default EtcDetails;
