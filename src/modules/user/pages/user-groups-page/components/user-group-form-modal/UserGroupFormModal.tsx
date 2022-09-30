import { FormProvider, useForm } from "react-hook-form";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type UserGroupFormModalProps = {
  onConfirm(data: any): void;
} & DialogProps;

const UserGroupFormModal: React.FC<UserGroupFormModalProps> = ({
  onConfirm,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    onConfirm(data);
  };

  return (
    <Dialog {...props}>
      <DialogTitle title={props.title} />
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <ControlledTextInput name="group" label="Grupo" />
            <ControlledTextInput name="description" label="Descrição" />
            <Typography>Permissões</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Todos" />
            </FormGroup>
            <SubmitButton />
          </FormProvider>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserGroupFormModal;

const validationSchema = object().shape({
  group: string().required("Nome do grupo é obrigatório"),
  description: string().required("Descrição é obrigatória"),
});
