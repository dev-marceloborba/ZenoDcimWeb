import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useModal } from "mui-modal-provider";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import ParameterBrowserModal from "../parameter-browser-modal/ParameterBrowserModal";
import {
  useCreateVirtualParameterMutation,
  useFindVirtualParameterByIdMutation,
  useUpdateVirtualParameterMutation,
} from "modules/automation/services/virtual-parameter-service";
import Loading from "modules/shared/components/Loading";
import { number, object, SchemaOf, string } from "yup";
import {
  VirtualParameterModel,
  VirtualParameterViewModel,
} from "modules/automation/models/virtual-parameter-model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "modules/shared/components/ToastProvider";
import useRouter from "modules/core/hooks/useRouter";
import { useEffect } from "react";

export default function VirtualParameterForm() {
  const methods = useForm<VirtualParameterViewModel>({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const { showModal } = useModal();
  const toast = useToast();
  const { back } = useRouter();
  const {
    state: { data, mode },
  }: {
    state: {
      data: VirtualParameterModel;
      mode: "new" | "edit";
    };
  } = useRouter();
  const [
    createVirtualParameter,
    { isLoading: isLoadingCreateVirtualParameter },
  ] = useCreateVirtualParameterMutation();
  const [updateVirtualParameter] = useUpdateVirtualParameterMutation();
  const [
    findVirtualParameterById,
    { data: virtualParameter, isLoading: isLoadingFindVirtualParameter },
  ] = useFindVirtualParameterByIdMutation();

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
    setValue,
  } = methods;

  const onSubmit: SubmitHandler<VirtualParameterViewModel> = async (model) => {
    if (mode === "edit") {
      await updateVirtualParameter({ ...model, id: data.id });
      toast
        .open({ message: "Parâmetro virtual atualizado com sucesso" })
        .then(() => back());
    } else {
      await createVirtualParameter(model).unwrap();
      toast
        .open({ message: "Parâmetro virtual criado com sucesso" })
        .then(() => back());
    }
  };

  const handleBrowseParameters = () => {
    const modal = showModal(ParameterBrowserModal, {
      onConfirm: (expression) => {
        setValue("expression", expression);
        modal.hide();
      },
      onCancel: () => {
        modal.hide();
      },
    });
  };

  useEffect(() => {
    async function fetchParameter() {
      if (mode === "edit" && data) {
        await findVirtualParameterById(data.id);
      }
    }
    fetchParameter();
  }, [data, findVirtualParameterById, mode]);

  useEffect(() => {
    if (mode === "edit" && virtualParameter) {
      setValue("name", virtualParameter.name);
      setValue("unit", virtualParameter.unit);
      setValue("lowLimit", virtualParameter.lowLimit);
      setValue("highLimit", virtualParameter.highLimit);
      setValue("scale", virtualParameter.scale);
      setValue("expression", virtualParameter.expression);
    }
  }, [mode, setValue, virtualParameter]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        expression: "",
        highLimit: 0,
        lowLimit: 0,
        name: "",
        scale: 0,
        unit: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <HeroContainer title="Criar/editar parâmetro virtual">
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
          <ControlledTextInput label="Limite inferior" name="lowLimit" />
          <ControlledTextInput label="Limite superior" name="highLimit" />
          <ControlledTextInput label="Escala" name="scale" />
          <ControlledTextInput label="Expressão" name="expression" />
          <SubmitButton disabled={!isValid} label="Salvar" />
          <Button onClick={() => handleBrowseParameters()} sx={{ mt: 2 }}>
            Buscar parâmetros
          </Button>
        </Form>
      </FormProvider>
      <Loading
        open={isLoadingCreateVirtualParameter || isLoadingFindVirtualParameter}
      />
    </HeroContainer>
  );
}

const schemaValidation: SchemaOf<VirtualParameterViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  lowLimit: number().required("Limite mínimo é obrigatório"),
  highLimit: number().required("Limite máximo é obrigatório"),
  expression: string().required("Expressão é obrigatória"),
});
