import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import {
  MeasureHistoryModel,
  MeasureHistoryViewModel,
} from "modules/automation/models/measure-history-model";
import { useFindAllMeasuresMutation } from "modules/automation/services/history-service";
import Loading from "modules/shared/components/Loading";
import { useEffect, useRef, useState } from "react";
import Row from "modules/shared/components/Row";
import { useModal } from "mui-modal-provider";
import FiltersPopup from "./filters-popup/FiltersPopup";
import { Button, TextField } from "@mui/material";

export default function MeasureHistory() {
  const [filters, setFilters] = useState<MeasureHistoryViewModel>(
    {} as MeasureHistoryViewModel
  );
  const siteRef = useRef<HTMLInputElement>();
  const buildindRef = useRef<HTMLInputElement>();
  const floorRef = useRef<HTMLInputElement>();
  const roomRef = useRef<HTMLInputElement>();
  const equipmentRef = useRef<HTMLInputElement>();
  const parameterRef = useRef<HTMLInputElement>();

  const { showModal } = useModal();

  const [findAllMeasures, { data: measures, isLoading }] =
    useFindAllMeasuresMutation();

  useEffect(() => {
    async function fetchMeasures() {
      await findAllMeasures(filters).unwrap();
    }
    fetchMeasures();
  }, [filters, findAllMeasures]);

  const handleRowClick = (row: MeasureHistoryModel) => {
    console.log(row);
  };

  const handleOpenFiltersPopup = () => {
    const modal = showModal(FiltersPopup, {
      onCancel: () => {
        modal.hide();
      },
    });
  };

  const handleApplyFilterClick = () => {
    setFilters({
      site: siteRef.current?.value,
      building: buildindRef.current?.value,
      floor: floorRef.current?.value,
      room: roomRef.current?.value,
      equipment: equipmentRef.current?.value,
      parameter: parameterRef.current?.value,
    });
  };

  return (
    <HeroContainer title="Histórico de medições">
      {/* <Row>
        <TextField label="Site" name="site" inputRef={siteRef} />
        <TextField label="Prédio" name="building" inputRef={buildindRef} />
        <TextField label="Andar" name="floor" inputRef={floorRef} />
        <TextField label="Sala" name="room" inputRef={roomRef} />
        <TextField
          label="Equipamento"
          name="equipment"
          inputRef={equipmentRef}
        />
        <TextField label="Parâmetro" name="parameter" inputRef={parameterRef} />
        <Button variant="contained" onClick={handleApplyFilterClick}>
          Aplicar filtro
        </Button>
      </Row> */}
      <Button onClick={handleOpenFiltersPopup}>Filtros</Button>
      <DataTable
        title="Medições"
        rows={measures ?? []}
        columns={columns}
        options={{
          onRowClick: handleRowClick,
          rowsInPage: 25,
        }}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "site",
    label: "Site",
  },
  {
    name: "building",
    label: "Prédio",
  },
  {
    name: "floor",
    label: "Andar",
  },
  {
    name: "room",
    label: "Sala",
  },
  {
    name: "equipment",
    label: "Equipamento",
  },
  {
    name: "parameter",
    label: "Parâmetro",
  },
  {
    name: "value",
    label: "Valor",
  },
  {
    name: "timestamp",
    label: "Estampa de tempo",
  },
];
