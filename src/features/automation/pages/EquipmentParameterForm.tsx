import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledTextInput from "app/components/ControlledTextInput";
import Button from "@mui/material/Button";
import Form from "app/components/Form";
import { number, object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFindEquipmentParameterByIdMutation } from "app/services/datacenter";
import { EquipmentParameterRequest } from "app/models/data-center.model";

const EquipmentParameterForm: React.FC = () => {
  const { state } = useLocation();
  const methods = useForm<EquipmentParameterRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [findParameter, { data: parameter }] =
    useFindEquipmentParameterByIdMutation();

  useEffect(() => {
    if (state.parameterId) {
      findParameter(state.parameterId);
    }
  }, [findParameter, state.parameterId]);

  useEffect(() => {
    if (parameter) {
      methods.setValue("name", parameter.name);
      methods.setValue("unit", parameter.unit);
      methods.setValue("lowLimit", parameter.lowLimit);
      methods.setValue("highLimit", parameter.highLimit);
      methods.setValue("scale", parameter.scale);
      methods.setValue("dataSource", parameter.dataSource);
      methods.setValue("address", parameter.address);
    }
  }, [methods, parameter]);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EquipmentParameterRequest> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
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
          <ControlledTextInput name="parameter" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="limitMin" label="Limite inferior" />
          <ControlledTextInput name="limitMax" label="Limite superior" />
          <ControlledTextInput name="scale" label="Escala" />
          <ControlledTextInput name="dataSource" label="Fonte de dados" />
          <ControlledTextInput name="address" label="Endereço" />
          <Button fullWidth variant="contained" type="submit">
            Salvar
          </Button>
        </FormProvider>
      </Form>
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

export default EquipmentParameterForm;
