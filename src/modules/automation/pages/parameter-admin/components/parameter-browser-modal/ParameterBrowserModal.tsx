import React, { useState } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Loading from "modules/shared/components/Loading";
import { Button, Grid, Input, TextField } from "@mui/material";
import Center from "modules/shared/components/Center";
import { useFindAllEquipmentsQuery } from "modules/automation/services/equipment-service";
import {
  EquipmentModel,
  ParameterModel,
} from "modules/automation/models/automation-model";

type ParameterBrowserModalProps = {
  onConfirm: (values: any) => void;
  onCancel: () => void;
} & DialogProps;

type SelectedNodeProps = {
  parameter: ParameterModel;
  equipment: EquipmentModel;
};

const ParameterBrowserModal: React.FC<ParameterBrowserModalProps> = ({
  ...props
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeProps>(
    {} as SelectedNodeProps
  );
  const [expression, setExpression] = useState("");
  const { onConfirm, onCancel } = props;
  const { data, isLoading } = useFindAllEquipmentsQuery();

  //   const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
  //     setExpanded(nodeIds);
  //   };

  //   const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
  //     setSelected(nodeIds);
  //   };

  //   const handleExpandClick = () => {
  //     setExpanded((oldExpanded) =>
  //       oldExpanded.length === 0 ? ["1", "5", "6", "7"] : []
  //     );
  //   };

  //   const handleSelectClick = () => {
  //     setSelected((oldSelected) =>
  //       oldSelected.length === 0
  //         ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  //         : []
  //     );
  //   };

  const concatParameter = () => {
    return selectedNode.equipment.component + "." + selectedNode.parameter.name;
  };

  const handleAdd = () => {
    // setExpression(concatParameter() + "+");
  };

  const handleParameterClick = (
    equipment: EquipmentModel,
    parameter: ParameterModel
  ) => {
    setExpression(expression + equipment.component + "." + parameter.name);
    setSelectedNode({ equipment, parameter });
  };

  const handleExpressionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpression(event.target.value);
  };

  const handleSaveActions = () => {
    onConfirm(expression);
  };

  return (
    <Dialog
      {...props}
      sx={{
        "& .MuiPaper-root": {
          width: 500,
          height: "auto",
          overflow: "auto",
        },
      }}
    >
      <DialogTitle>Navegador de parâmetros</DialogTitle>
      <DialogContent>
        <Grid container columnSpacing={2} alignItems="center">
          <Grid item md={6}>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              //   onNodeToggle={handleToggle}
              //   onNodeSelect={handleSelect}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
              }}
            >
              {data?.map((equipment) => (
                <TreeItem
                  key={equipment.id}
                  nodeId={equipment.id}
                  label={equipment.component}
                >
                  {equipment.equipmentParameters?.map((parameter) => (
                    <TreeItem
                      key={parameter.id}
                      nodeId={parameter.id}
                      label={parameter.name}
                      onClick={() => handleParameterClick(equipment, parameter)}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeView>
          </Grid>

          <Grid item md={6}>
            {/* <Grid container rowSpacing={2}>
              <Grid item md={6}>
                <Center>
                  <Button variant="contained" onClick={handleAdd}>
                    +
                  </Button>
                </Center>
              </Grid>
              <Grid item md={6}>
                <Center>
                  <Button variant="contained">-</Button>
                </Center>
              </Grid>
              <Grid item md={6}>
                <Center>
                  <Button variant="contained">x</Button>
                </Center>
              </Grid>
              <Grid item md={6}>
                <Center>
                  <Button variant="contained">/</Button>
                </Center>
              </Grid>
            </Grid> */}
            <TextField
              fullWidth
              label="Expressão"
              sx={{ mt: 2 }}
              value={expression}
              onChange={handleExpressionChange}
            />
            <Button onClick={() => setExpression("")}>Limpar</Button>
          </Grid>
        </Grid>

        {/* <Input /> */}
        <DialogActions>
          <Button onClick={handleSaveActions}>Salvar</Button>
        </DialogActions>
      </DialogContent>
      <Loading open={isLoading} />
    </Dialog>
  );
};

export default ParameterBrowserModal;
