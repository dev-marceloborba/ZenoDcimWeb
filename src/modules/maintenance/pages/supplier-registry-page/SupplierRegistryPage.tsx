import { yupResolver } from "@hookform/resolvers/yup";
import useRouter from "modules/core/hooks/useRouter";
import { CreateSupplierViewModel } from "modules/maintenance/models/supplier.model";
import { useCreateSupplierMutation } from "modules/maintenance/services/supplier.service";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";

export default function SupplierRegistryPage() {
  const methods = useForm<CreateSupplierViewModel>({
    resolver: yupResolver(validationSchema),
  });
  const { back } = useRouter();
  const toast = useToast();
  const [createSupplier] = useCreateSupplierMutation();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CreateSupplierViewModel> = async (data) => {
    try {
      await createSupplier(data).unwrap();
      toast
        .open("Fornecedor criado com sucesso", 2000, "success")
        .then(() => back());
    } catch {
      toast.open("Erro ao criar fornecedor", 2000, "error");
    }
  };

  return (
    <HeroContainer title="Registro de fornecedor">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextInput label="Responsável" name="responsible" />
          <ControlledTextInput label="Empresa" name="company" />
          <ControlledTextInput label="E-mail" name="email" />
          <ControlledTextInput label="Telefone" name="phone" />
          <SubmitButton />
        </Form>
      </FormProvider>
    </HeroContainer>
  );
}

const validationSchema: SchemaOf<CreateSupplierViewModel> = object().shape({
  responsible: string().required("Responsável é obrigatório"),
  company: string().required("Empresa é obrigatória"),
  email: string().email("E-mail inválido").required("Email é obrigatório"),
  phone: string().required("Telefone é obrigatório"),
});
