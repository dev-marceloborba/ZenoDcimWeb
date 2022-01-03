import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { BmsEquipment, EEquipmentStatus } from "app/types/bms";
import { FilterData } from "../types/filter-data";
import BmsIndicator from "app/components/BmsIndicator";

type EquipmentCardProps = BmsEquipment & FilterData & {
  showGroupTitle?: boolean
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({ ...props }) => {
  const { name, status, groups, energy, clim, telecom, showGroupTitle } = props;

  // console.log(groups)

  const getFilterName = (): string => {
    if (energy) {
      return "Energia";
    } else if (clim) {
      return "Clima";
    } else if (telecom) {
      return "Telecom";
    } else {
      return "";
    }
  };

  // const filteredGroup = groups.filter((group) =>
  //   group.name.includes(getFilterName())
  // );

  const filteredGroup = groups.filter(
    // (group) => group.name.includes("Energia") || group.name.includes("Clima")
    (group) => group.name.includes("Energia")
  );

  console.log(filteredGroup);

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

      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      {
        filteredGroup.map((group) => (
          <Box key={group.name}>
            {showGroupTitle && (<Typography>{group.name}</Typography>)} 
            {group.informations.map((information, index) => (
              <BmsIndicator key={index} {...information} status={status} />
            ))}
          </Box>
        ))
      }
      </Box>      
    </Card>
  );
};

export default EquipmentCard;
