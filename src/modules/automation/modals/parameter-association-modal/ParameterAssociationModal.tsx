import React, { useState } from "react";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
// import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Center from "modules/shared/components/Center";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  EquipmentParameterGroupModel,
  EquipmentParameterModel,
  ParameterModel,
} from "modules/automation/models/automation-model";
import DataTable from "modules/shared/components/datatableV2/DataTable";

type ParameterAssociationModalProps = {
  onConfirm(): void;
  data: {
    groups: EquipmentParameterGroupModel[];
    equipment: string;
    parameters: EquipmentParameterModel[];
  };
} & ModalProps;

const ParameterAssociationModal: React.FC<ParameterAssociationModalProps> = ({
  data,
  onConfirm,
  ...props
}) => {
  const { equipment, groups, parameters } = data;
  const [selectedParametersFromGroup, setSelectedParametersFromGroup] =
    useState<EquipmentParameterModel[]>([...parameters]);

  const handleConfirm = () => {
    onConfirm();
  };

  const handleSelectParameter = (
    event: React.ChangeEvent<HTMLInputElement>,
    parameter: any
  ) => {
    if (event.target.checked) {
      const checkIfExists = selectedParametersFromGroup.find(
        (p) => p.name === parameter.name
      );
      if (!checkIfExists) {
        setSelectedParametersFromGroup((prevState) => [
          ...prevState,
          parameter,
        ]);
      }
    } else {
      const filteredItems = selectedParametersFromGroup.filter(
        (x) => x.name !== parameter.name
      );
      setSelectedParametersFromGroup(filteredItems);
    }
  };

  const handleSelectedItems = (
    parametersFromEquipment: EquipmentParameterModel[]
  ) => {
    console.log(parametersFromEquipment);
  };

  return (
    <Modal {...props}>
      <Typography>{equipment}</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="Center"
        marginTop={1}
      >
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography textAlign="center">Grupo de parâmetros</Typography>
          <Paper
            sx={{
              minHeight: 400,
              minWidth: 320,
            }}
          >
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                minHeight: 400,
                flexGrow: 1,
                minWidth: 320,
                overflowY: "auto",
              }}
            >
              {groups.map((group) => (
                <TreeItem key={group.id} nodeId={group.id} label={group.name}>
                  {group.parameterGroupAssignments?.map(
                    (parameterGroupAssignment) => {
                      const isSelected = (row: any) =>
                        selectedParametersFromGroup.find(
                          (x) => x.name === row.name
                        ) !== undefined;

                      return (
                        <FormGroup sx={{ ml: 1 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isSelected(
                                  parameterGroupAssignment.parameter
                                )}
                                onChange={(e, c) =>
                                  handleSelectParameter(
                                    e,
                                    parameterGroupAssignment.parameter
                                  )
                                }
                              />
                            }
                            label={parameterGroupAssignment.parameter.name}
                          />
                        </FormGroup>
                      );
                    }
                  )}
                </TreeItem>
              ))}
            </TreeView>
          </Paper>
        </Stack>

        <Stack
          direction="column"
          alignItems="center"
          marginLeft={1}
          marginRight={1}
        >
          <Button variant="outlined">{">>"}</Button>
          <Button variant="outlined" sx={{ mt: 1 }}>
            {"<<"}
          </Button>
        </Stack>

        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography textAlign="center">Parâmetros associados</Typography>
          <DataTable
            title=""
            columns={[
              {
                name: "name",
                label: "Parâmetro",
              },
              {
                name: "unit",
                label: "Unidade",
              },
            ]}
            rows={selectedParametersFromGroup}
            options={{
              hidePagination: true,
              hideSearch: false,
              selectionMode: "show",
              onSelectedItems: handleSelectedItems,
              previousItems: parameters,
            }}
            sx={{
              height: 400,
              // minHeight: 400,
              // maxHeight: 300,
            }}
          />
        </Stack>

        {/* <Paper>
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
          ></TreeView>
        </Paper> */}
      </Stack>

      <Center sx={{ mt: 1 }}>
        <Button variant="contained" onClick={handleConfirm}>
          Salvar
        </Button>
      </Center>
    </Modal>
  );
};

export default ParameterAssociationModal;
