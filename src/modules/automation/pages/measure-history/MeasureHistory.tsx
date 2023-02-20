import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import {
  MeasureHistoryModel,
  MeasureHistoryViewModel,
} from "modules/automation/models/measure-history-model";
import {
  useDownloadMeasureReportMutation,
  useFindAllMeasuresMutation,
} from "modules/automation/services/history-service";
import Loading from "modules/shared/components/Loading";
import { useEffect, useRef, useState } from "react";
import Row from "modules/shared/components/Row";
import { useModal } from "mui-modal-provider";
import FiltersPopup from "./filters-popup/FiltersPopup";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import DownloadButton from "modules/shared/components/download-button/DownloadButton";
import { CSVDownload, CSVLink } from "react-csv";

export default function MeasureHistory() {
  const [filters, setFilters] = useState<MeasureHistoryViewModel>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });
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

  const [findAllMeasures, { data: measures, isLoading }] =
    useFindAllMeasuresMutation();
  const [generateReport, { isLoading: loadingReport }] =
    useDownloadMeasureReportMutation();

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
      <Row sx={{ mb: 2 }} alignItems="center">
        <DateTimePicker
          label="Data inicial"
          value={filters.initialDate}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} />}
          onAccept={handleChangeInitialDate}
        />

        <DateTimePicker
          label="Data final"
          value={filters.finalDate}
          onChange={() => {}}
          renderInput={(params) => <TextField sx={{ ml: 2 }} {...params} />}
          onAccept={handleChangeFinalDate}
        />
        {/* <DownloadButton
          href={`https://localhost:5001/v1/reports/measure-history/MeasureReport?initialDate=${filters.initialDate?.toUTCString()}&finalDate=${filters.finalDate?.toUTCString()}`}
        /> */}
        {/* <Button
          target="_blank"
          onClick={async () => {
            await generateReport({}).unwrap();
          }}
        >
          Download
        </Button> */}
        {/* <CSVDownload target="_blank" data={measures ?? []} /> */}
        {/* <CSVLink data={measures ?? []}>Download me</CSVLink> */}
      </Row>

      <DataTable
        title="Medições"
        rows={measures ?? []}
        columns={columns}
        options={{
          onRowClick: handleRowClick,
          rowsInPage: 25,
          selectionMode: "hide",
        }}
      />
      <Loading open={isLoading || loadingReport} />
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
