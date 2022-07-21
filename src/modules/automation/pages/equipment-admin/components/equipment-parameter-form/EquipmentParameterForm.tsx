import { yupResolver } from "@hookform/resolvers/yup";
import { EquipmentParameterViewModel } from "modules/automation/models/automation-model";
import {
  useCreateEquipmentParameterMutation,
  useUpdateEquipmentParameterMutation,
} from "modules/automation/services/equipment-parameter-service";
import useRouter from "modules/core/hooks/useRouter";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { number, object, SchemaOf, string } from "yup";

export default function EquipmentParameterForm() {
  const {
    state: { data, mode },
  }: { state: { data: any; mode: "new" | "edit" } } = useRouter();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [updateEquipmentParameter] = useUpdateEquipmentParameterMutation();
  const [createEquipmentParameter] = useCreateEquipmentParameterMutation();

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (viewModel: any) => {
    if (mode === "new") {
      await createEquipmentParameter(viewModel).unwrap();
      toast
        .open("Parâmetro de equipamento criado com sucesso", 2000, "success")
        .then(() => navigate(-1));
    } else {
      await updateEquipmentParameter({ ...viewModel, id: data.id }).unwrap();
      toast
        .open(
          "Parâmetro de equipamento atualizado com sucesso",
          2000,
          "success"
        )
        .then(() => navigate(-1));
    }
  };

  useEffect(() => {
    function fillFields() {
      if (mode === "edit") {
        setValue("name", data.name);
        setValue("unit", data.unit);
        setValue("scale", data.scale);
        setValue("lowLimit", data.lowLimit);
        setValue("highLimit", data.highLimit);
        setValue("address", data.address);
        setValue("dataSource", data.dataSource);
      }
    }
    if (data) fillFields();
  }, [data, mode, setValue]);

  return (
    <HeroContainer title="Editar parâmetro de equipamento">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextInput name="name" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="scale" label="Escala" />
          <ControlledTextInput name="lowLimit" label="Limite mínimo" />
          <ControlledTextInput name="highLimit" label="Limite máximo" />
          <ControlledTextInput name="address" label="Endereço" />
          <ControlledTextInput name="dataSource" label="Fonte de dados" />
          <SubmitButton label="Salvar" />
        </Form>
      </FormProvider>
    </HeroContainer>
  );
}

const validationSchema = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  lowLimit: number().required("Limite mínimo é obrigatório"),
  highLimit: number().required("Limite máximo é obrigatório"),
  address: string().required("Endereço é obrigatório"),
  dataSource: string().required("Fonte de dados é obrigatório"),
});