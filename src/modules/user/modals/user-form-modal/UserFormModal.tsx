import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Grid from "@mui/material/Grid";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, ref, boolean } from "yup";
import Form, { FormMode } from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { UserModel, UserEditorModel } from "modules/user/models/user-model";
import { GroupModel } from "modules/user/models/group.model";
import { CompanyModel } from "modules/user/models/company-model";

type UserFormProps = {
  mode?: FormMode;
  onConfirm(formData: UserEditorModel): void;
  data?: {
    model?: UserModel;
    groups: GroupModel[];
    companies: CompanyModel[];
  };
} & ModalProps;

const UserFormModal: React.FC<UserFormProps> = ({
  mode = "new",
  onConfirm,
  data,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(
      mode === "new" ? validationSchema : validationSchemaEdit
    ),
    mode: "onChange",
    defaultValues: data?.model,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  return (
    <Modal {...props}>
      <Form onSubmit={handleSubmit(onConfirm)} sx={{ marginTop: 1 }}>
        <FormProvider {...methods}>
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12}>
              <ControlledTextInput
                name="companyId"
                label="Empresa"
                items={data?.companies?.map((company) => ({
                  value: company.id,
                  description: company.tradingName,
                }))}
              />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextInput name="firstName" label="Nome" />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextInput name="lastName" label="Sobrenome" />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextInput name="email" label="E-mail" />
            </Grid>
            <Grid item xs={6}>
              <ControlledTextInput
                name="groupId"
                label="Grupo"
                items={
                  data?.groups.map((group) => ({
                    description: group.name,
                    value: group.id,
                  })) ?? []
                }
              />
            </Grid>
            {mode === "new" ? (
              <>
                <Grid item xs={6}>
                  <ControlledTextInput
                    name="password"
                    label="Senha"
                    type="password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <ControlledTextInput
                    name="passwordConfirmation"
                    label="Confirmação de senha"
                    type="password"
                  />
                </Grid>
              </>
            ) : null}
            {mode === "edit" ? (
              <Grid item xs={6}>
                <ControlledTextInput
                  name="active"
                  label="Status"
                  items={[
                    {
                      value: false,
                      description: "Inativo",
                    },
                    {
                      value: true,
                      description: "Ativo",
                    },
                  ]}
                />
              </Grid>
            ) : null}
          </Grid>
          <SubmitButton disabled={!isValid} sx={{ mt: 2 }} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default UserFormModal;

const validationSchema = object().shape({
  firstName: string().required("Nome é obrigatorio"),
  lastName: string().required("Sobrenome é obrigatorio"),
  email: string().email("E-mail inválido").required("E-mail é obrigatorio"),
  password: string()
    .min(5, "Senha deve ter ao menos 5 caracteres")
    .required("Senha é obrigatória"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  groupId: string().required("Grupo de usuário é obrigatório"),
  companyId: string().required("Empresa é obrigatória"),
});

const validationSchemaEdit = object().shape({
  firstName: string().required("Nome é obrigatorio"),
  lastName: string().required("Sobrenome é obrigatorio"),
  email: string().email("E-mail inválido").required("E-mail é obrigatorio"),
  groupId: string().required("Grupo de usuário é obrigatório"),
  companyId: string().required("Empresa é obrigatória"),
  active: boolean().required("Status é obrigatório"),
});
