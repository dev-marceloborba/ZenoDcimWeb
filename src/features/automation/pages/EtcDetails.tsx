import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import EquipmentCard from "../components/EquipmentCard";
import PageTitle from "app/components/PageTitle";
import EtcFilters from "../components/EtcFilters";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";
import { EquipmentResponse } from "app/models/data-center.model";
import { useFindRoomByIdMutation } from "app/services/datacenter";
import Loading from "app/components/Loading";
import { EEquipmentStatus, EParameterStatus } from "app/types/bms";

const EtcDetails: React.FC = () => {
  const { groups } = useAutomationFilters();
  const [equipments, setEquipments] = useState<EquipmentResponse[]>([]);
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
