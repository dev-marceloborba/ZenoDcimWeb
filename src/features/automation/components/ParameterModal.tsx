import React from "react";
import PageTitle from "app/components/PageTitle";
import Form from "app/components/Form";
import ControlledTextInput from "app/components/ControlledTextInput";
import SubmitButton from "app/components/SubmitButton";
import { useListAllParameterGroupsQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";
import { number, object, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal, { ModalProps } from "@mui/material/Modal";
import { modalStyle } from "app/styles/modal-style";
import { ParameterRequest } from "app/models/data-center.model";

type ParameterModalProps = {
  onConfirm: (data: ParameterRequest) => void;
} & Omit<ModalProps, "children">;

const ParameterModal: React.FC<ParameterModalProps> = ({
  onConfirm,
  ...props
}) => {
  const { data: parameterGroups, isLoading } = useListAllParameterGroupsQuery();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ParameterRequest) => onConfirm(data);

  return (
    <Modal {...props}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          ...modalStyle,
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
          <ControlledTextInput
            name="groupId"
            label="Grupo"
            items={parameterGroups?.map((parameterGroup) => ({
              description: parameterGroup.name,
              value: parameterGroup.id,
            }))}
          />
          <SubmitButton label="Criar" />
        </FormProvider>
        <Loading open={isLoading} />
      </Form>
    </Modal>
  );
};

export default ParameterModal;

const validationSchema = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  lowLimit: number().required("Limite inferior é obrigatório"),
  highLimit: number().required("Limite superior é obrigatório"),
  scale: number().required("Escala é obrigatória"),
  groupId: string().required("Grupo é obrigatório"),
});
