import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledTextInput from "app/components/ControlledTextInput";
import Form from "app/components/Form";
import { number, object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateEquipmentParameterMutation,
  useFindEquipmentParameterByIdMutation,
} from "app/services/datacenter";
import { EquipmentParameterRequest } from "app/models/data-center.model";
import SubmitButton from "app/components/SubmitButton";
import { useToast } from "app/components/Toast";

const EquipmentParameterForm: React.FC = () => {
  const { state } = useLocation();
  const methods = useForm<EquipmentParameterRequest>({
    resolver: yupResolver(validationSchema),
  });
  const [findParameter, { data: parameter }] =
    useFindEquipmentParameterByIdMutation();
  const [createEquipmentParameter] = useCreateEquipmentParameterMutation();
  const toast = useToast();

  useEffect(() => {
    if (state.parameterId) {
      findParameter(state.parameterId);
    }
  }, [findParameter, state.parameterId]);

  useEffect(() => {
    if (parameter) {
      methods.setValue("name", parameter.name ?? "");
      methods.setValue("unit", parameter.unit ?? "");
      methods.setValue("lowLimit", parameter.lowLimit ?? 0);
      methods.setValue("highLimit", parameter.highLimit ?? 0);
      methods.setValue("scale", parameter.scale ?? 0);
      methods.setValue("dataSource", parameter.dataSource ?? "");
      methods.setValue("address", parameter.address ?? "");
    }
  }, [methods, parameter]);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EquipmentParameterRequest> = async (data) => {
    data.equipmentId = state.equipmentId;
    try {
      await createEquipmentParameter(data).unwrap;
      toast.open("Parâmetro criado com sucesso", 2000, "success");
    } catch (error) {
      toast.open(`Erro ao criar parâmetro: ${error}`, 2000, "error");
    }
  };

  return (
    <Container maxWidth="xl">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "& .MuiFormControl-root, .MuiButton-root": {
            marginTop: 2,
          },
        }}
      >
        <Typography variant="h5">Novo parâmetro</Typography>
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="lowLimit" label="Limite inferior" />
          <ControlledTextInput name="highLimit" label="Limite superior" />
          <ControlledTextInput name="scale" label="Escala" />
          <ControlledTextInput name="dataSource" label="Fonte de dados" />
          <ControlledTextInput name="address" label="Endereço" />
          <SubmitButton label="Salvar" />
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

export default EquipmentParameterForm;
