import { yupResolver } from "@hookform/resolvers/yup";
// import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CreateRackViewModel } from "modules/datacenter/models/rack.model";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form, { FormMode } from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";

type RackFormModalProps = {
  onConfirm(formData: CreateRackViewModel): void;
  mode?: FormMode;
  data?: any;
} & ModalProps;

const RackFormModal: React.FC<RackFormModalProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const methods = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit = (formData: CreateRackViewModel) => onConfirm(formData);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle1">Identidade</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={6}>
              <ControlledTextInput name="title" label="Título do rack" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="localization" label="Localização" />
            </Grid>
          </Grid>
          <Typography variant="subtitle1">Dados do rack</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={6}>
              <ControlledTextInput name="size" label="Tamanho (A x C x P cm)" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="capacity" label="Capacidade (RU's)" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="power" label="Potência do rack (kW)" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="weight" label="Peso suportável (kg)" />
            </Grid>
          </Grid>
          <Typography variant="subtitle1">Local</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={6}>
              <ControlledTextInput
                name="siteId"
                label="Site"
                // items={infra.sites ?? []}
                // onChange={(e) => selections.siteSelection(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="buildingId"
                label="Prédio"
                // items={infra.buildings ?? []}
                // onChange={(e) => selections.buildingSelection(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="floorId"
                label="Andar"
                // items={infra.floors ?? []}
                // onChange={(e) => selections.floorSelection(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="roomId"
                label="Sala"
                // items={infra.rooms ?? []}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1">Descrição</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={12}>
              <ControlledTextInput
                name="description"
                label="Descrição"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          {/* <ControlledTextInput name="localization" label="Localização" /> */}
          <SubmitButton disabled={!isValid} sx={{ mt: 1 }} />
          {/* <Button onClick={onCancel}>Cancelar</Button> */}
        </Form>
      </FormProvider>
    </Modal>
  );
};

type FormProps = {
  size: string;
  localization: string;
  weight: number;
  roomId: string;
  floorId: string;
  buildingId: string;
  siteId: string;
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  size: string().required("Tamanho do rack é obrigatório"),
  localization: string().required("Localização do rack é obrigatória"),
  weight: number().required("Peso total do rack é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  floorId: string().required("Andar é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  siteId: string().required("Site é obrigatório"),
});

export default RackFormModal;
