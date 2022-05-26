import React from "react";
import { useFindAllModbusTagsQuery } from "app/services/automation";
import ListPanel from "app/components/ListPanel";

const ModbusTagList: React.FC = () => {
  const { data, isLoading, isError, error } = useFindAllModbusTagsQuery();

  return (
    <ListPanel
      newActionLabel="Novo Tag"
      newActionLink="/zeno/modbus-tag/new"
      columns={[
        { label: "Nome", name: "name", align: "left" },
        { label: "Tipo", name: "dataType", align: "right" },
        { label: "Endereço", name: "address", align: "right" },
        { label: "Tamanho", name: "size", align: "right" },
        { label: "Banda morta", name: "deadband", align: "right" },
      ]}
      rows={data}
    />
  );
};

export default ModbusTagList;
