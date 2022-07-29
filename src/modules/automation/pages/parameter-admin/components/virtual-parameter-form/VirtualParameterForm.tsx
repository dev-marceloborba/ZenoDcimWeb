import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useModal } from "mui-modal-provider";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import ParameterBrowserModal from "../parameter-browser-modal/ParameterBrowserModal";

export default function VirtualParameterForm() {
  const methods = useForm();
  const { showModal } = useModal();
  const { handleSubmit, setValue } = methods;

  const onSubmit = (value: any) => {
    console.log(value);
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
    </HeroContainer>
  );
}
