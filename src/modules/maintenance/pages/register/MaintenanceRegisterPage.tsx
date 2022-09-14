import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useForm } from "react-hook-form";

export default function MaintenanceRegisterPage() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <HeroContainer title="Registro de manutenção">
      {/* <InDevelopMessage /> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextInput label="Responsável" name="responsible" />
        <ControlledTextInput label="Site" name="site" />
        <ControlledTextInput label="Prédio" name="building" />
        <ControlledTextInput label="Andar" name="floor" />
        <ControlledTextInput label="Sala" name="room" />
        <ControlledTextInput label="Equipamento" name="equipment" />
        <ControlledTextInput label="Atividade" name="activity" />
        <ControlledTextInput label="Data de início" name="initialDate" />
        <ControlledTextInput label="Data de fim" name="finalData" />
        <SubmitButton />
      </Form>
    </HeroContainer>
  );
}
