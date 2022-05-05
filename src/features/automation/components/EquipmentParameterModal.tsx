import React, { useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object, number } from "yup";
import Container from "@mui/material/Container";
import ControlledTextInput from "app/components/ControlledTextInput";
import Form from "app/components/Form";
import SubmitButton from "app/components/SubmitButton";
import Typography from "@mui/material/Typography";
import { modalStyle } from "app/styles/modal-style";
import { EquipmentParameterRequest } from "app/models/data-center.model";
import { useFindEquipmentByIdMutation } from "app/services/datacenter";

type EquipmentParameterModalProps = {
  equipmentId: string;

  closeModal(): void;
  onSaveData(data: EquipmentParameterRequest): void;
};

const EquipmentParameterModal: React.FC<EquipmentParameterModalProps> = ({
  closeModal,
  onSaveData,
  equipmentId,
}) => {
  const [findEquipment, { data: equipment }] = useFindEquipmentByIdMutation();
  const methods = useForm<EquipmentParameterRequest>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EquipmentParameterRequest> = async (data) => {
    onSaveData({ ...data, equipmentId });
    closeModal();
  };

  useEffect(() => {
    async function getEquipment() {
      await findEquipment(equipmentId).unwrap();
    }
    getEquipment();
  }, [equipmentId, findEquipment]);

  return (
    <Container maxWidth="md">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          ...modalStyle,
          "& .MuiFormControl-root, .MuiButton-root": {
            marginTop: 2,
          },
        }}
      >
        <Typography variant="h5">Novo parâmetro</Typography>
        <Typography sx={{ my: 1 }}>{`Equipamento: ${
          equipment?.component ?? ""
        }`}</Typography>
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="lowLimit" label="Limite inferior" />
          <ControlledTextInput name="highLimit" label="Limite superior" />
          <ControlledTextInput name="scale" label="Escala" />
          <ControlledTextInput name="dataSource" label="Fonte de dados" />
          <ControlledTextInput name="address" label="Endereço" />
          <SubmitButton label="Salvar" fullWidth />
        </FormProvider>
      </Form>
    </Container>
  );
};

const validationSchema = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  lowLimit: number().required("Limite mínimo é obrigatório"),
  highLimit: number().required("Limite máximo é obrigatório"),
  scale: number().required("Escala é obrigatória"),
  dataSource: string().required("Fonte de dados é obrigatória"),
  address: string().required("Endereço é obrigatório"),
});

export default EquipmentParameterModal;
