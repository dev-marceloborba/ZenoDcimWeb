import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useFindParameterByGroupMutation } from "modules/automation/services/parameter-service";
import { useState } from "react";
import { ParameterModel } from "modules/automation/models/automation-model";
import { useFindAllParameterGroupsQuery } from "modules/automation/services/parameter-group-service";
import Loading from "modules/shared/components/Loading";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";

type GroupListModalProps = {
  onConfirm: (data: any) => void;
  onCancel: () => void;
} & Omit<DialogProps, "children">;

export default function GroupListModal(props: GroupListModalProps) {
  const { onConfirm, onCancel, title, ...rest } = props;
  const [groupParameters, setGroupParameters] = useState<ParameterModel[]>([]);
  const [findParametersByGroup] = useFindParameterByGroupMutation();
  const { data: groups, isLoading } = useFindAllParameterGroupsQuery();

  const handleChangeGroup = async (group: string) => {
    const result = await findParametersByGroup(group).unwrap();
    setGroupParameters(result);
  };

  return (
    <Dialog {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item md={6}>
            <List>
              {groups?.map((group, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={() => handleChangeGroup(group.name)}>
                    <ListItemText primary={group.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item md={6}>
            <DataTable title="" columns={columns} rows={groupParameters} />
          </Grid>
        </Grid>
        <Loading open={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Parâmetro",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "lowLimit",
    label: "Limite mínimo",
  },
  {
    name: "highLimit",
    label: "Limite máximo",
  },
  {
    name: "scale",
    label: "Escala",
  },
];
