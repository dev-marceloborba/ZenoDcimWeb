import { useEffect } from "react";
import ControlledTextInput from "app/components/ControlledTextInput";
import useRouter from "modules/core/hooks/useRouter";
import { SiteViewModel } from "modules/datacenter/models/datacenter-model";
import { useCreateSiteMutation } from "modules/datacenter/services/site-service";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SiteForm() {
  const methods = useForm<SiteViewModel>({
    resolver: yupResolver(validationSchema),
  });
  const toast = useToast();
  const { back, state } = useRouter();
  const [createSite, { isLoading }] = useCreateSiteMutation();

  const { mode, data } = state;

  const { handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<SiteViewModel> = async (data) => {
    await createSite(data).unwrap();
    toast.open("Site criado com sucesso", 2000, "success").then(() => back());
  };

  // useEffect(() => {
  //   if (mode === "edit") {
  //     setValue("name", data.name);
  //   }
  // }, [data.name, mode, setValue]);

  return (
    <HeroContainer title="Criar/editar site">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextInput name="name" label="Site" />
          <SubmitButton label="Salvar" sx={{ mt: 2 }} />
        </Form>
      </FormProvider>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const validationSchema: SchemaOf<SiteViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
});
