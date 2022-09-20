import HeroContainer from "modules/shared/components/HeroContainer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useRouter from "modules/core/hooks/useRouter";
import { WorkEventsTableViewModel } from "modules/maintenance/models/work-order.model";
import { useEffect } from "react";
import { useFindWorkOrderByIdMutation } from "modules/maintenance/services/maintenance.service";
import Loading from "modules/shared/components/Loading";

export default function WorkOrderDetailsPage() {
  const {
    state: { data },
  }: {
    state: {
      data: WorkEventsTableViewModel;
    };
  } = useRouter();
  const [findWorkOrder, { data: workOrder, isLoading }] =
    useFindWorkOrderByIdMutation();

  useEffect(() => {
    async function fetchWorkOrder() {
      if (data) {
        await findWorkOrder(data.id).unwrap();
      }
    }
    fetchWorkOrder();
  }, [data, findWorkOrder]);

  return (
    <HeroContainer title="Detalhes da ordem de serviço">
      <Grid container direction="column">
        <Grid item>
          <Card>
            <CardHeader title="Localização" />
            <Divider />
            <List>
              <ListItem>
                <ListItemText
                  sx={{
                    flexDirection: "row",
                  }}
                  //   sx={{
                  //     display: "flex",
                  //     flexDirection: "row",
                  //     flex: "1 1 auto",
                  //   }}
                >
                  <Typography variant="h6">Titulo</Typography>
                  <Box flex={"1 1 0%"}>
                    <Typography variant="body2">Subtitulo</Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      <TextField
        type="text"
        value={workOrder?.id}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        value={workOrder?.site.name}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        value={workOrder?.building.name}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        value={workOrder?.floor.name}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        value={workOrder?.room.name}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        value={workOrder?.equipment.component}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        value={workOrder?.initialDate}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        value={workOrder?.finalDate}
        InputProps={{
          readOnly: true,
        }}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
