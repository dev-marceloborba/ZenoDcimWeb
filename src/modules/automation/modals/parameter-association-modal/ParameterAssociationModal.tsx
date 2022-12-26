import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Center from "modules/shared/components/Center";
import SubmitButton from "modules/shared/components/SubmitButton";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type ParameterAssociationModalProps = {
  equipment: string;
  sites: {
    id: string;
    name: string;
    buildings: {
      id: string;
      name: string;
      floors: {
        id: string;
        name: string;
        rooms: {
          id: string;
          name: string;
          equipments: {
            id: string;
            name: string;
            parameters: {
              id: string;
              name: string;
            }[];
          }[];
        }[];
      }[];
    }[];
  }[];
} & ModalProps;

const ParameterAssociationModal: React.FC<ParameterAssociationModalProps> = ({
  equipment,
  sites,
  ...props
}) => {
  const handleParameterClick = (
    site: any,
    building: any,
    floor: any,
    room: any,
    equipment: any,
    parameter: any
  ) => {
    const elements = [site, building, floor, room, equipment, parameter];
    console.log(elements.join("."));
  };

  return (
    <Modal {...props}>
      <Typography>{equipment}</Typography>
      <Grid container justifyContent="center" alignItems="Center" marginTop={1}>
        <Grid item md={5}>
          <Paper>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 650,
                overflowY: "auto",
              }}
            >
              {sites.map((site) => (
                <TreeItem key={site.id} nodeId={site.id} label={site.name}>
                  {site.buildings.map((building) => (
                    <TreeItem
                      key={building.id}
                      nodeId={building.id}
                      label={building.name}
                    >
                      {building.floors.map((floor) => (
                        <TreeItem
                          key={floor.id}
                          nodeId={floor.id}
                          label={floor.name}
                        >
                          {floor.rooms.map((room) => (
                            <TreeItem
                              key={room.id}
                              nodeId={room.id}
                              label={room.name}
                            >
                              {room.equipments.map((equipment) => (
                                <TreeItem
                                  key={equipment.id}
                                  nodeId={equipment.id}
                                  label={equipment.name}
                                >
                                  {equipment.parameters.map((parameter) => (
                                    <TreeItem
                                      key={parameter.id}
                                      nodeId={parameter.id}
                                      label={parameter.name}
                                      onClick={() =>
                                        handleParameterClick(
                                          site.name,
                                          building.name,
                                          floor.name,
                                          room.name,
                                          equipment.name,
                                          parameter.name
                                        )
                                      }
                                    />
                                  ))}
                                </TreeItem>
                              ))}
                            </TreeItem>
                          ))}
                        </TreeItem>
                      ))}
                    </TreeItem>
                  ))}
                </TreeItem>
              ))}
            </TreeView>
          </Paper>
        </Grid>
        <Grid item md={2}>
          <Stack direction="column" alignItems="center">
            <Button variant="outlined">{">>"}</Button>
            <Button variant="outlined" sx={{ mt: 1 }}>
              {"<<"}
            </Button>
          </Stack>
        </Grid>
        <Grid item md={5}>
          <Paper>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 650,
                overflowY: "auto",
              }}
            >
              {sites.map((site) => (
                <TreeItem key={site.id} nodeId={site.id} label={site.name}>
                  {site.buildings.map((building) => (
                    <TreeItem
                      key={building.id}
                      nodeId={building.id}
                      label={building.name}
                    >
                      {building.floors.map((floor) => (
                        <TreeItem
                          key={floor.id}
                          nodeId={floor.id}
                          label={floor.name}
                        >
                          {floor.rooms.map((room) => (
                            <TreeItem
                              key={room.id}
                              nodeId={room.id}
                              label={room.name}
                            >
                              {room.equipments.map((equipment) => (
                                <TreeItem
                                  key={equipment.id}
                                  nodeId={equipment.id}
                                  label={equipment.name}
                                >
                                  {equipment.parameters.map((parameter) => (
                                    <TreeItem
                                      key={parameter.id}
                                      nodeId={parameter.id}
                                      label={parameter.name}
                                      // onClick={() =>
                                      //   handleParameterClick(
                                      //     site,
                                      //     building,
                                      //     floor,
                                      //     room,
                                      //     equipment,
                                      //     parameter
                                      //   )
                                      // }
                                    />
                                  ))}
                                </TreeItem>
                              ))}
                            </TreeItem>
                          ))}
                        </TreeItem>
                      ))}
                    </TreeItem>
                  ))}
                </TreeItem>
              ))}
            </TreeView>
          </Paper>
        </Grid>
      </Grid>
      <Center sx={{ mt: 1 }}>
        <SubmitButton />
      </Center>
    </Modal>
  );
};

export default ParameterAssociationModal;
