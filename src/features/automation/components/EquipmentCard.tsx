import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { BmsEquipment, EEquipmentStatus } from "app/types/bms";
import { FilterData } from "../types/filter-data";
import BmsIndicator from "app/components/BmsIndicator";

type EquipmentCardProps = BmsEquipment & FilterData;

const EquipmentCard: React.FC<EquipmentCardProps> = ({ ...props }) => {
  const { name, status, groups, energy, clim, telecom } = props;

  const getFilterName = () => {
    if (energy) {
      return "Energia";
    } else if (clim) {
      return "Clima";
    } else if (telecom) {
      return "Telecom";
    }
  };

  const filteredGroup = groups.filter(
    (group) => group.name === getFilterName()
  )[0];

  return (
    <Card sx={{ p: 4, m: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{name}</Typography>
        <Typography
          sx={{ color: status === EEquipmentStatus.ONLINE ? "green" : "red" }}
        >
          {status === EEquipmentStatus.ONLINE ? "Online" : "Offline"}
        </Typography>
      </Box>

      {filteredGroup?.informations?.map((information, index) => (
        <BmsIndicator key={index} {...information} status={status} />
      ))}
    </Card>
  );
};

export default EquipmentCard;
