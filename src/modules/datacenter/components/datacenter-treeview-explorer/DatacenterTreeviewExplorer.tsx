import Paper from "@mui/material/Paper";
import TreeView, { TreeViewProps } from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SiteModel } from "modules/datacenter/models/datacenter-model";

type ParameterArgs = {
  site: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  parameter: string;
};

type DatacenterTreeviewExplorerProps = {
  sites: SiteModel[];
  onParameterClick(args: ParameterArgs): void;
} & TreeViewProps;

const DatacenterTreeviewExplorer: React.FC<DatacenterTreeviewExplorerProps> = ({
  sites,
  onParameterClick,
  ...props
}) => {
  return (
    <Paper>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          height: 474,
          flexGrow: 1,
          maxWidth: 400,
          overflow: "auto",
        }}
        {...props}
      >
        {sites.map((site) => (
          <TreeItem key={site.id} nodeId={site.id} label={site.name}>
            {site.buildings.map((building) => (
              <TreeItem
                key={building.id}
                nodeId={building.id}
                label={building.name}
              >
                {building.floors?.map((floor) => (
                  <TreeItem key={floor.id} nodeId={floor.id} label={floor.name}>
                    {floor.rooms?.map((room) => (
                      <TreeItem
                        key={room.id}
                        nodeId={room.id}
                        label={room.name}
                      >
                        {room.equipments?.map((equipment) => (
                          <TreeItem
                            id={equipment.id}
                            nodeId={equipment.id}
                            label={equipment.component}
                          >
                            {equipment.equipmentParameters?.map((parameter) => (
                              <TreeItem
                                key={parameter.id}
                                nodeId={parameter.id}
                                label={parameter.name}
                                onClick={() =>
                                  onParameterClick({
                                    site: site.name,
                                    building: building.name,
                                    floor: floor.name,
                                    room: room.name,
                                    equipment: equipment.description,
                                    parameter: parameter.name,
                                  })
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
  );
};

export default DatacenterTreeviewExplorer;
