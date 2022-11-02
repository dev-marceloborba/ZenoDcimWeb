import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { useFindUserByIdMutation } from "modules/user/services/authentication-service";
import { useUpdateUserPreferenciesMutation } from "modules/user/services/user-preferencies.service";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

const UserPreferencies: React.FC = () => {
  const [findUser, { data: user, isLoading }] = useFindUserByIdMutation();
  const [updatePreferencies] = useUpdateUserPreferenciesMutation();
  const methods = useForm();
  const toast = useToast();

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      await updatePreferencies({
        ...data,
        id: user?.id ?? "",
      }).unwrap();
      toast.open({ message: "Preferências de usuário atualizadas" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao atualizar preferências de usuário",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const result = await findUser(
        "afb5c435-81c1-4f1d-ad3b-bab84116ec46"
      ).unwrap();
      console.log(result);
      localStorage.setItem(
        "user-preferencies",
        JSON.stringify(result.userPreferencies)
      );
      reset({
        ...result.userPreferencies,
      });
    }
    fetchUser();
  }, [findUser, reset]);

  return (
    <HeroContainer title="Preferências de usuário">
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            "& .MuiFormControl-root": {
              my: 1,
            },
          }}
        >
          <ControlledTextInput
            name="userTable"
            label="Tabela de usuário"
            type="number"
          />
          <ControlledTextInput
            name="siteTable"
            label="Tabela de site"
            type="number"
          />
          <ControlledTextInput
            name="buildingTable"
            label="Tabela de prédio"
            type="number"
          />
          <ControlledTextInput
            name="roomTable"
            label="Tabela de sala"
            type="number"
          />
          <ControlledTextInput
            name="parameterTable"
            label="Tabela de parâmetros"
            type="number"
          />
          <ControlledTextInput
            name="availableParameterTable"
            label="Tabela de parâmetros disponíveis"
            type="number"
          />
          <ControlledTextInput
            name="groupParameterTable"
            label="Tabela de grupo de parâmetros"
            type="number"
          />
          <ControlledTextInput
            name="equipmentTable"
            label="Tabela de equipamentos"
            type="number"
          />
          <ControlledTextInput
            name="ruleTable"
            label="Tabela de regras"
            type="number"
          />
          <ControlledTextInput
            name="equipmentParameterTable"
            label="Tabela de parâmetros de equipamento"
            type="number"
          />
          <SubmitButton />
        </Form>
      </FormProvider>
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default UserPreferencies;

// const schemaValidation = object().shape({
//   userTable: string().notRequired(),

// })
