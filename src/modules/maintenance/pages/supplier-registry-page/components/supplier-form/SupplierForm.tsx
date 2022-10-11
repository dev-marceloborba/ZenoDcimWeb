import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateSupplierViewModel,
  SupplierModel,
} from "modules/maintenance/models/supplier.model";
import {
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from "modules/maintenance/services/supplier.service";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

type SupplierFormProps = {
  mode?: "new" | "edit";
  model?: SupplierModel;
  onConfirm(): void;
} & DialogProps;

const SupplierForm: React.FC<SupplierFormProps> = ({
  mode = "new",
  model,
  ...props
}) => {
  const methods = useForm<CreateSupplierViewModel>({
    resolver: yupResolver(validationSchema),
  });
  const toast = useToast();
  const [createSupplier] = useCreateSupplierMutation();
  const [updateSupplier] = useUpdateSupplierMutation();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CreateSupplierViewModel> = async (data) => {
    if (mode === "new") {
      try {
        await createSupplier(data).unwrap();
        toast
          .open({ message: "Fornecedor criado com sucesso" })
          .then(() => props.onConfirm());
      } catch {
        toast.open({ message: "Erro ao criar fornecedor", severity: "error" });
      }
    } else if (mode === "edit") {
      try {
        await updateSupplier({
          id: model!.id,
          ...data,
        }).unwrap();
        toast
          .open({ message: "Fornecedor atualizado com sucesso" })
          .then(() => props.onConfirm());
      } catch {
        toast.open({
          message: "Erro ao atualizar fornecedor",
          severity: "error",
        });
      }
    }
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Criar/editar fornecedor</DialogTitle>
      <DialogTitle>
        {mode === "new" ? "Criar fornecedor" : "Atualizar fornecedor"}
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              "& .MuiFormControl-root": {
                mt: 1,
              },
            }}
          >
            <ControlledTextInput label="Responsável" name="responsible" />
            <ControlledTextInput label="Empresa" name="company" />
            <ControlledTextInput label="E-mail" name="email" />
            <ControlledTextInput label="Telefone" name="phone" />
            <SubmitButton sx={{ mt: 1 }} />
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierForm;

const validationSchema: SchemaOf<CreateSupplierViewModel> = object().shape({
  responsible: string().required("Responsável é obrigatório"),
  company: string().required("Empresa é obrigatória"),
  email: string().email("E-mail inválido").required("Email é obrigatório"),
  phone: string().required("Telefone é obrigatório"),
});
