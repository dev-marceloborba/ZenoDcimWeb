import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";

type TablePreferencesModalProps = {
  name: any;
  onConfirm(): void;
} & ModalProps;

const TablePreferencesModal: React.FC<TablePreferencesModalProps> = ({
  name,
  onConfirm,
  ...props
}) => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const onSubmit = (data: any) => {
    const userPreferences = JSON.parse(
      localStorage.getItem("user-preferencies") as string
    );
    userPreferences[name] = data[name];
    localStorage.setItem("user-preferencies", JSON.stringify(userPreferences));
    onConfirm();
  };

  useEffect(() => {
    const userPreferences = JSON.parse(
      localStorage.getItem("user-preferencies") as string
    );
    reset({
      [name]: userPreferences[name],
    });
  }, [name, reset]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextInput
            name={name}
            label="Linhas por página"
            type="number"
            sx={{ my: 1 }}
          />
          <SubmitButton />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default TablePreferencesModal;
