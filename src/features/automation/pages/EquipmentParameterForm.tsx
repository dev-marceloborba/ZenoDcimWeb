import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledTextInput from "app/components/ControlledTextInput";
import Button from "@mui/material/Button";
import Form from "app/components/Form";
import { number, object, SchemaOf, string } from "yup";
import { NewAutomationParameterRequest } from "app/services/automation-register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFindEquipmentParameterByIdMutation } from "app/services/datacenter";

const EquipmentParameterForm: React.FC = () => {
  //   const params = useParams();
  const { state } = useLocation();
  const methods = useForm<NewAutomationParameterRequest>({
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
      methods.setValue("parameter", parameter.name);
      methods.setValue("unit", parameter.unit);
      methods.setValue("limitMin", parameter.lowLimit);
      methods.setValue("limitMax", parameter.highLimit);
      methods.setValue("scale", parameter.scale);
      methods.setValue("dataSource", parameter.dataSource);
      methods.setValue("address", parameter.address);
    }
  }, [methods, parameter]);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<NewAutomationParameterRequest> = async (
    data
  ) => {
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

const validationSchema: SchemaOf<NewAutomationParameterRequest> =
  object().shape({
    parameter: string().required("Parâmetro é obrigatório"),
    unit: string().required("Unidade é obrigatória"),
    limitMin: number().required("Limite mínimo é obrigatório"),
    limitMax: number().required("Limite máximo é obrigatório"),
    scale: number().required("Escala é obrigatória"),
    dataSource: string().required("Fonte de dados é obrigatória"),
    address: string().required("Endereço é obrigatório"),
  });

export default EquipmentParameterForm;
