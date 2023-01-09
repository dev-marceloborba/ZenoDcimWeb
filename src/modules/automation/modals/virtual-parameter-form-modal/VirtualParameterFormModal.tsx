import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import { VirtualParameterViewModel } from "modules/automation/models/virtual-parameter-model";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form, { FormMode } from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { number, object, SchemaOf, string } from "yup";
import { ParameterModel } from "modules/automation/models/automation-model";
import { useEffect, useState } from "react";
import SearchButton from "modules/shared/components/search-button/SearchButton";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Paper, TextField } from "@mui/material";
import { SiteModel } from "modules/datacenter/models/datacenter-model";

type VirtualParameterFormModalProps = {
  onConfirm(formData: VirtualParameterViewModel): void;
  mode?: FormMode;
  data?: {
    model?: ParameterModel;
    sites?: SiteModel[];
  };
} & ModalProps;

type ParameterSelection = {
  site: string;
  building: string;
  room: string;
  floor: string;
  equipment: string;
  parameter: string;
};

const VirtualParameterFormModal: React.FC<VirtualParameterFormModalProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const [expression, setExpression] = useState("");
  const [expanded, setExpanded] = useState(false);
  const methods = useForm<VirtualParameterViewModel>({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
    setValue,
    watch,
  } = methods;

  // const currentExpression = watch("expression");

  const onSubmit: SubmitHandler<VirtualParameterViewModel> = (formData) =>
    onConfirm(formData);

  const handleOpenSearch = () => setExpanded((prevState) => !prevState);

  const handleParameterClick = (selection: ParameterSelection) => {
    const pathname = Object.values(selection).join(".");
    setValue("expression", currentExpression + pathname);
    // setExpression((prevState) => prevState + pathname);
  };

  const handleExpressionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpression(event.target.value);
  };

  useEffect(() => {
    if (mode === "edit") {
      reset({ ...data?.model });
    }
  }, [data?.model, mode, reset]);

  const currentExpression = watch("expression");

  return (
    <Modal
      {...props}
      PaperProps={{
        sx: {
          minWidth: expanded ? "900px" : "600px",
          transition: "all 200ms linear",
        },
      }}
    >
      <Grid container columnSpacing={1}>
        <Grid item md={expanded ? 6 : 12}>
          <FormProvider {...methods}>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                "& .MuiFormControl-root": {
                  mt: 2,
                },
              }}
            >
              <ControlledTextInput label="Parâmetro" name="name" />
              <ControlledTextInput label="Unidade" name="unit" />
              <ControlledTextInput
                label="Limite muito baixo"
                name="lowLowLimit"
              />
              <ControlledTextInput label="Limite baixo" name="lowLimit" />
              <ControlledTextInput label="Limite alto" name="highLimit" />
              <ControlledTextInput
                label="Limite muito alto"
                name="highHighLimit"
              />
              <ControlledTextInput
                label="Escala"
                name="scale"
                defaultValue={1}
              />
              <ControlledTextInput
                label="Expressão"
                name="expression"
                multiline
                maxRows={10}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchButton onClick={handleOpenSearch} />
                    </InputAdornment>
                  ),
                }}
              />
              <SubmitButton disabled={!isValid} sx={{ mt: 1 }} />
            </Form>
          </FormProvider>
        </Grid>

        {expanded ? (
          <Grid item md={6}>
            <Paper sx={{ mt: 2 }}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  height: 474,
                  flexGrow: 1,
                  maxWidth: 400,
                  overflow: "auto",
                }}
              >
                {data?.sites?.map((site) => (
                  <TreeItem key={site.id} nodeId={site.id} label={site.name}>
                    {site.buildings.map((building) => (
                      <TreeItem
                        key={building.id}
                        nodeId={building.id}
                        label={building.name}
                      >
                        {building.floors?.map((floor) => (
                          <TreeItem
                            key={floor.id}
                            nodeId={floor.id}
                            label={floor.name}
                          >
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
                                    {equipment.equipmentParameters?.map(
                                      (parameter) => (
                                        <TreeItem
                                          key={parameter.id}
                                          nodeId={parameter.id}
                                          label={parameter.name}
                                          onClick={() =>
                                            handleParameterClick({
                                              site: site.name,
                                              building: building.name,
                                              floor: floor.name,
                                              room: room.name,
                                              equipment: equipment.description,
                                              parameter: parameter.name,
                                            })
                                          }
                                        />
                                      )
                                    )}
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
            {/* <TextField
              variant="outlined"
              placeholder="Expressão selecionada"
              fullWidth
              sx={{ mt: 1 }}
              multiline
              rows={3}
              value={expression}
              onChange={handleExpressionChange}
            /> */}
          </Grid>
        ) : null}
      </Grid>
    </Modal>
  );
};

export default VirtualParameterFormModal;

const schemaValidation = object().shape({
  name: string().required("Nome é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  lowLowLimit: number().notRequired(),
  lowLimit: number().notRequired(),
  highLimit: number().notRequired(),
  highHighLimit: number().notRequired(),
  expression: string().required("Expressão é obrigatória"),
});
