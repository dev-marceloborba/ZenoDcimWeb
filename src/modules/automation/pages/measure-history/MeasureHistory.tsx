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
import { DateTimePicker } from "@mui/x-date-pickers";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";

type HistoryViewModel = {
  site: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  name: string;
  value: number;
  timestamp: string;
};

export default function MeasureHistory() {
  const [filters, setFilters] = useState<MeasureHistoryViewModel>(
    {} as MeasureHistoryViewModel
  );
  const [measures, setMeasures] = useState<HistoryViewModel[]>([]);
  const siteRef = useRef<HTMLInputElement>();
  const buildindRef = useRef<HTMLInputElement>();
  const floorRef = useRef<HTMLInputElement>();
  const roomRef = useRef<HTMLInputElement>();
  const equipmentRef = useRef<HTMLInputElement>();
  const parameterRef = useRef<HTMLInputElement>();
  const initialDateRef = useRef<HTMLInputElement>();
  const finalDateRef = useRef<HTMLInputElement>();

  const { showModal } = useModal();

  // const [findAllMeasures, { data: measures, isLoading }] =
  //   useFindAllMeasuresMutation();

  const [findAllMeasures, { isLoading }] = useFindAllMeasuresMutation();

  useEffect(() => {
    async function fetchMeasures() {
      let output: HistoryViewModel[] = [];
      const result = await findAllMeasures(filters).unwrap();
      for (let i = 0; i < result.length; i++) {
        const fields = result[i].name
          ?.split("*")
          .map((x) => x.replace("_", " ").replace("_", " ")) as string[];

        output.push({
          site: fields[0],
          building: fields[1],
          floor: fields[2],
          room: fields[3],
          equipment: fields[4],
          name: fields[5],
          value: result[i].value,
          timestamp: getTimeStampFormat(result[i].timestamp),
        });
      }
      setMeasures(output);
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
      initialDate: new Date(initialDateRef.current?.value ?? ""),
      finalDate: new Date(finalDateRef.current?.value ?? ""),
    });
  };

  const handleChangeInitialDate = (date: Date | null) => {
    setFilters({ ...filters, initialDate: date });
  };

  const handleChangeFinalDate = (date: Date | null) => {
    setFilters({ ...filters, finalDate: date });
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
      {/* <Button onClick={handleOpenFiltersPopup}>Filtros</Button> */}
      <DateTimePicker
        label="Data inicial"
        value={filters.initialDate}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        onAccept={handleChangeInitialDate}
      />
      {/* <TextField
        id="datetime-local"
        label="Data inicial"
        type="datetime-local"
        defaultValue={filters.initialDate ?? new Date()}
        inputRef={initialDateRef}
        // defaultValue="2017-05-24T10:30"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> */}
      <DateTimePicker
        label="Data final"
        value={filters.finalDate}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        onAccept={handleChangeFinalDate}
      />
      {/* <TextField
        id="datetime-local"
        label="Data final"
        type="datetime-local"
        defaultValue={filters.finalDate ?? new Date()}
        inputRef={finalDateRef}
        // defaultValue="2017-05-24T10:30"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> */}
      {/* <Button onClick={handleApplyFilterClick}>Aplicar filtro</Button> */}
      <DataTable
        title="Medições"
        rows={measures ?? []}
        // rows={[]}
        columns={columns}
        options={{
          onRowClick: handleRowClick,
          rowsInPage: 25,
          // selectionMode: "hide",
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
    name: "name",
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
