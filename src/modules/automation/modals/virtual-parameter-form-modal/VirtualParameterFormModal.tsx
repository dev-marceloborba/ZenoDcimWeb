import { yupResolver } from "@hookform/resolvers/yup";
import { VirtualParameterViewModel } from "modules/automation/models/virtual-parameter-model";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SubmitButton from "modules/shared/components/SubmitButton";
import { number, object, SchemaOf, string } from "yup";

type VirtualParameterFormModalProps = {} & ModalProps;

const VirtualParameterFormModal: React.FC<VirtualParameterFormModalProps> = ({
  ...props
}) => {
  const methods = useForm<VirtualParameterViewModel>({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
    setValue,
  } = methods;

  const onSubmit: SubmitHandler<VirtualParameterViewModel> = async (
    model
  ) => {};

  const handleBrowseParameters = () => {
    // const modal = showModal(ParameterBrowserModal, {
    //   onConfirm: (expression) => {
    //     setValue("expression", expression);
    //     modal.hide();
    //   },
    //   onCancel: () => {
    //     modal.hide();
    //   },
    // });
  };

  return (
    <Modal {...props}>
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
          <ControlledTextInput label="Limite muito baixo" name="lowLowLimit" />
          <ControlledTextInput label="Limite baixo" name="lowLimit" />
          <ControlledTextInput label="Limite alto" name="highLimit" />
          <ControlledTextInput label="Limite muito alto" name="highHighLimit" />
          <ControlledTextInput label="Escala" name="scale" defaultValue={1} />
          <ControlledTextInput label="Expressão" name="expression" />
          <SubmitButton disabled={!isValid} />
          <Button onClick={() => handleBrowseParameters()} sx={{ mt: 2 }}>
            Buscar parâmetros
          </Button>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default VirtualParameterFormModal;

const schemaValidation = object().shape({
  name: string().required("Nome é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  lowLowLimit: number().notRequired(),
  lowLimit: number().notRequired(),
  highLimit: number().notRequired(),
  highHighLimit: number().notRequired(),
  expression: string().required("Expressão é obrigatória"),
});
