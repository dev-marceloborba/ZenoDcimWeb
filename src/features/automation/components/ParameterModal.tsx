import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ControlledTextInput from "app/components/ControlledTextInput";
import { modalStyle } from "app/styles/modal-style";
import { useAutomationFilters } from "./AutomationFiltersProvider";
import { EquipmentParameterRequest } from "app/models/data-center.model";

type ParameterModalProps = {
  requestParameters: {
    buildingId: string;
    floorId: string;
    roomId: string;
    equipmentId: string;
  };
  closeModal(): void;
  onSaveData(data: EquipmentParameterRequest): void;
};

const ParameterModal: React.FC<ParameterModalProps> = ({
  closeModal,
  onSaveData,
  requestParameters: { equipmentId },
}) => {
  const {
    building: buildingId,
    floor: floorId,
    room: roomId,
  } = useAutomationFilters();
  const methods = useForm<EquipmentParameterRequest>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<EquipmentParameterRequest> = async (data) => {
    try {
      onSaveData(data);
    } catch (error) {
      console.log(error);
    }
  };

  setValue("equipmentId", equipmentId);

  console.log(buildingId);
  console.log(floorId);
  console.log(roomId);
  console.log(equipmentId);

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          ...modalStyle,
          "& .MuiFormControl-root, .MuiButton-root": {
            marginTop: 2,
          },
        }}
      >
        <Typography variant="h5">Novo parâmetro</Typography>
        <FormProvider {...methods}>
          <ControlledTextInput name="equipmentId" label="Equipamento" />
          <ControlledTextInput name="name" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="lowLimit" label="Limite inferior" />
          <ControlledTextInput name="highLimit" label="Limite superior" />
          <ControlledTextInput name="scale" label="Escala" />
          <ControlledTextInput name="dataSource" label="Fonte de dados" />
          <ControlledTextInput name="address" label="Endereço" />
          <Button fullWidth variant="contained" type="submit">
            Salvar
          </Button>
        </FormProvider>
      </Box>
    </Container>
  );
};

const validationSchema: SchemaOf<EquipmentParameterRequest> = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  lowLimit: number().required("Limite mínimo é obrigatório"),
  highLimit: number().required("Limite máximo é obrigatório"),
  scale: number().required("Escala é obrigatória"),
  dataSource: string().required("Fonte de dados é obrigatória"),
  address: string().required("Endereço é obrigatório"),
  equipmentId: string().required("Equipamento é obrigatório"),
});

export default ParameterModal;
