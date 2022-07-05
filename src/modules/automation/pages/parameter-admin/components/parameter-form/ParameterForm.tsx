import { number, object, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import Loading from "modules/shared/components/Loading";
import { useFindAllParameterGroupsQuery } from "modules/automation/services/parameter-group-service";
import { ParameterViewModel } from "modules/automation/models/automation-model";
import HeroContainer from "modules/shared/components/HeroContainer";

import { useModal } from "mui-modal-provider";
import Button from "@mui/material/Button";
import GroupListModal from "../group-list-modal/GroupListModal";

export default function ParameterForm() {
  const { data: parameterGroups, isLoading } = useFindAllParameterGroupsQuery();
  const { showModal } = useModal();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ParameterViewModel) => {
    console.log(data);
  };

  const handleOpenGroupModal = () => {
    const modal = showModal(GroupListModal, {
      onConfirm: (data) => {
        console.log(data);
      },
      onCancel: () => {
        modal.hide();
      },
      PaperProps: {
        style: {
          minHeight: "80vh",
          minWidth: "80vw",
        },
      },
      title: "Grupos de parâmetros",
    });
  };

  return (
    <HeroContainer title="Novo parâmetro">
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
          <ControlledTextInput
            name="groupId"
            label="Grupo"
            items={parameterGroups?.map((parameterGroup) => ({
              description: parameterGroup.name,
              value: parameterGroup.id,
            }))}
          />
          <SubmitButton label="Criar" />
          <Button onClick={handleOpenGroupModal}>Criar grupo</Button>
        </FormProvider>
        <Loading open={isLoading} />
      </Form>
    </HeroContainer>
  );
}

const validationSchema = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  lowLimit: number().required("Limite inferior é obrigatório"),
  highLimit: number().required("Limite superior é obrigatório"),
  scale: number().required("Escala é obrigatória"),
  groupId: string().required("Grupo é obrigatório"),
});
