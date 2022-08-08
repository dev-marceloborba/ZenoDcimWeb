import { useRef, useState } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MeasureHistoryViewModel } from "modules/automation/models/measure-history-model";
import { styled } from "@mui/system";

type FiltersPopupProps = {
  onCancel: () => void;
} & DialogProps;

const FiltersPopup: React.FC<FiltersPopupProps> = ({ onCancel, ...props }) => {
  const [filters, setFilters] = useState<MeasureHistoryViewModel>(
    {} as MeasureHistoryViewModel
  );
  const siteRef = useRef<HTMLInputElement>();
  const buildindRef = useRef<HTMLInputElement>();
  const floorRef = useRef<HTMLInputElement>();
  const roomRef = useRef<HTMLInputElement>();
  const equipmentRef = useRef<HTMLInputElement>();
  const parameterRef = useRef<HTMLInputElement>();

  const handleApplyFilterClick = () => {
    setFilters({
      site: siteRef.current?.value,
      building: buildindRef.current?.value,
      floor: floorRef.current?.value,
      room: roomRef.current?.value,
      equipment: equipmentRef.current?.value,
      parameter: parameterRef.current?.value,
    });
    onCancel();
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Filtro para histórico de medições</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item md={6}>
            <StyledTextField
              fullWidth
              label="Site"
              name="site"
              inputRef={siteRef}
            />
            <StyledTextField
              fullWidth
              label="Prédio"
              name="building"
              inputRef={buildindRef}
            />
            <StyledTextField
              fullWidth
              label="Andar"
              name="floor"
              inputRef={floorRef}
            />
          </Grid>
          <Grid item md={6}>
            <StyledTextField
              fullWidth
              label="Sala"
              name="room"
              inputRef={roomRef}
            />
            <StyledTextField
              fullWidth
              label="Equipamento"
              name="equipment"
              inputRef={equipmentRef}
            />
            <StyledTextField
              fullWidth
              label="Parâmetro"
              name="parameter"
              inputRef={parameterRef}
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button variant="contained" onClick={handleApplyFilterClick}>
            Aplicar filtro
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

const StyledTextField = styled(TextField)`
  margin-top: 1rem;
`;

export default FiltersPopup;
