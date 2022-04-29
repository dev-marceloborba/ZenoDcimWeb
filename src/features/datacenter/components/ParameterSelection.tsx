import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useListAllParametersQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";

import { EquipmentParameterResponse } from "app/models/data-center.model";
import DataTable from "app/components/DataTable";

type ParameterSelectionProps = {
  open: boolean;
  handleCloseModal: () => void;
  setSelectedParameter: (parameter: any) => void;
  previousParameters: any;
};

const ParameterSelection: React.FC<ParameterSelectionProps> = ({
  open,
  handleCloseModal,
  setSelectedParameter,
  previousParameters,
}) => {
  const { data: parameters, isLoading } = useListAllParametersQuery();
  const [selected, setSelected] = useState<EquipmentParameterResponse[]>([]);

  useEffect(() => {
    if (parameters) {
      const arr: EquipmentParameterResponse[] = [];

      previousParameters?.forEach((parameter: any) => {
        const _parameter = parameters.find((p) => p.id === parameter.id)!;
        arr.push(_parameter);
      });

      setSelected(arr);
    }
  }, [parameters, previousParameters, setSelected]);

  const handleSaveSelection = () => {
    setSelectedParameter(selected);
    handleCloseModal();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Selecionar parâmetro</DialogTitle>
      <DataTable
        rows={parameters ?? []}
        columns={columns}
        title="Parâmetros"
        options={{
          onSelectedItems: setSelected,
          previousItems: selected,
          onRowClick: (row) => {
            console.log(row);
          },
          // onDeleteSelection: (rows) => {
          //   console.log(rows);
          // },
        }}
      />
      <Button variant="contained" onClick={handleSaveSelection}>
        Selecionar
      </Button>
      <Loading open={isLoading} />
    </Dialog>
  );
};

const columns = [
  {
    label: "Nome",
    name: "name",
  },
  {
    label: "Unidade",
    name: "unit",
  },
  {
    label: "Limite mínimo",
    name: "lowLimit",
  },
  {
    label: "Limite máximo",
    name: "highLimit",
  },
  {
    label: "Escala",
    name: "scale",
  },
];

export default ParameterSelection;
