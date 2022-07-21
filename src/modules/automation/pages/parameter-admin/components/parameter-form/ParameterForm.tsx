import { number, object, SchemaOf, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import Loading from "modules/shared/components/Loading";

import {
  ParameterModel,
  ParameterViewModel,
} from "modules/automation/models/automation-model";
import HeroContainer from "modules/shared/components/HeroContainer";

import {
  useCreateParameterMutation,
  useUpdateParameterMutation,
} from "modules/automation/services/parameter-service";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "modules/shared/components/ToastProvider";
import { useEffect } from "react";
import useRouter from "modules/core/hooks/useRouter";

type FormMode = "edit" | "new";

export default function ParameterForm() {
  const [createParameter, { isLoading }] = useCreateParameterMutation();
  const [updateParameter] = useUpdateParameterMutation();
  const navigate = useNavigate();
  const {
    state: { data, mode },
  }: { state: { data: ParameterModel; mode: FormMode } } = useRouter();
  const toast = useToast();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (viewModel: ParameterViewModel) => {
    if (mode === "new") {
      await createParameter(viewModel).unwrap();
      toast
        .open("Parâmetro criado com sucesso!", 2000, "success")
        .then(() => navigate(-1));
    } else {
      await updateParameter({ ...viewModel, id: data.id }).unwrap();
      toast
        .open("Parâmetro editado com sucesso!", 2000, "success")
        .then(() => navigate(-1));
    }
  };

  useEffect(() => {
    function configureParameter() {
      if (mode === "edit") {
        setValue("name", data?.name);
        setValue("unit", data?.unit);
        setValue("lowLimit", data?.lowLimit);
        setValue("highLimit", data?.highLimit);
        setValue("scale", data?.scale);
      }
    }
    if (data) {
      configureParameter();
    }
  }, [data, mode, setValue]);

  return (
    <HeroContainer
      title={mode === "edit" ? "Editar parâmetro" : "Novo parâmetro"}
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          " & .MuiTextField-root, .MuiButton-root": {
            marginTop: 1,
          },
        }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="lowLimit" label="Limite inferior" />
          <ControlledTextInput name="highLimit" label="Limite superior" />
          <ControlledTextInput name="scale" label="Escala" />
          <SubmitButton label="Salvar" />
        </FormProvider>
        <Loading open={isLoading} />
      </Form>
    </HeroContainer>
  );
}

const validationSchema: SchemaOf<ParameterViewModel> = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  lowLimit: number().required("Limite inferior é obrigatório"),
  highLimit: number().required("Limite superior é obrigatório"),
  scale: number().required("Escala é obrigatória"),
});