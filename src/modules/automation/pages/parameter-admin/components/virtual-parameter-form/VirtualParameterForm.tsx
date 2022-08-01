import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useModal } from "mui-modal-provider";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import ParameterBrowserModal from "../parameter-browser-modal/ParameterBrowserModal";
import { useCreateVirtualParameterMutation } from "modules/automation/services/virtual-parameter-service";
import Loading from "modules/shared/components/Loading";
import { number, object, SchemaOf, string } from "yup";
import { VirtualParameterViewModel } from "modules/automation/models/virtual-parameter-model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "modules/shared/components/ToastProvider";
import useRouter from "modules/core/hooks/useRouter";

export default function VirtualParameterForm() {
  const methods = useForm<VirtualParameterViewModel>({
    resolver: yupResolver(schemaValidation),
  });
  const { showModal } = useModal();
  const toast = useToast();
  const { back } = useRouter();
  const [createVirtualParameter, { isLoading }] =
    useCreateVirtualParameterMutation();

  const { handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<VirtualParameterViewModel> = async (data) => {
    await createVirtualParameter(data).unwrap();
    toast
      .open("Parâmetro virtual criado com sucesso", 2000, "success")
      .then(() => back());
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
          <SubmitButton label="Salvar" />
          <Button onClick={() => handleBrowseParameters()} sx={{ mt: 2 }}>
            Buscar parâmetros
          </Button>
        </Form>
      </FormProvider>
      <Loading open={isLoading} />
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