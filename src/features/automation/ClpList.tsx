import React from "react";
import { useFindAllPlcsQuery } from "app/services/automation";
import ListPanel from "app/components/ListPanel";

const ClpList: React.FC = () => {
  const { data, isLoading, isError, error } = useFindAllPlcsQuery();

  return (
    <ListPanel
      newActionLabel="Novo CLP"
      newActionLink="/zeno/clp/new"
      columns={[
        { label: "Nome", name: "name", align: "left" },
        { label: "Fabriante", name: "manufactor", align: "right" },
        { label: "Modelo", name: "model", align: "right" },
        { label: "Endereço IP", name: "ipAddress", align: "right" },
        { label: "Porta TCP/IP", name: "tcpPort", align: "right" },
        { label: "Varredura", name: "scan", align: "right" },
      ]}
      rows={data}
    />
  );
};

export default ClpList;
