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
import { useNavigate } from "react-router-dom";
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
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
    setValue,
  } = methods;

  const onSubmit = async (viewModel: ParameterViewModel) => {
    if (mode === "new") {
      await createParameter(viewModel).unwrap();
      toast
        .open({ message: "Parâmetro criado com sucesso!" })
        .then(() => navigate(-1));
    } else {
      await updateParameter({ ...viewModel, id: data.id }).unwrap();
      toast
        .open({ message: "Parâmetro editado com sucesso!" })
        .then(() => navigate(-1));
    }
  };

  useEffect(() => {
    function configureParameter() {
      if (mode === "edit") {
        setValue("name", data?.name);
        setValue("unit", data?.unit);
        setValue("scale", data?.scale);
      }
    }
    if (data) {
      configureParameter();
    }
  }, [data, mode, setValue]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        unit: "",
        scale: 0,
      });
    }
  }, [isSubmitSuccessful, reset]);

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
          <ControlledTextInput name="scale" label="Escala" defaultValue={1} />
          <SubmitButton disabled={!isValid} label="Salvar" />
        </FormProvider>
        <Loading open={isLoading} />
      </Form>
    </HeroContainer>
  );
}

const validationSchema = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
});
