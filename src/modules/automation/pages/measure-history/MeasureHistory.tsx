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
import { Button, Input } from "@mui/material";

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
      <Row>
        <Input name="site" ref={siteRef} />
        <Input name="building" ref={buildindRef} />
        <Input name="floor" ref={floorRef} />
        <Input name="room" ref={roomRef} />
        <Input name="equipment" ref={equipmentRef} />
        <Input name="parameter" ref={parameterRef} />
        <Button onClick={handleApplyFilterClick}>Aplicar filtro</Button>
      </Row>
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
    name: "value",
    label: "Valor",
  },
  {
    name: "timestamp",
    label: "Estampa de tempo",
  },
  {
    name: "parameter",
    label: "Parâmetro",
  },
];
