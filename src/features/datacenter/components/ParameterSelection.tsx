import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useFindAllParametersQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";

import { ParameterResponse } from "app/models/data-center.model";
import DataTable from "app/components/DataTable";

type ParameterSelectionProps = {
  setSelectedParameter: (parameter: any) => void;
  previousParameters: any;
} & Omit<DialogProps, "children">;

const ParameterSelection: React.FC<ParameterSelectionProps> = ({
  setSelectedParameter,
  previousParameters,
  ...props
}) => {
  const { data: parameters, isLoading } = useFindAllParametersQuery();
  const [selected, setSelected] = useState<ParameterResponse[]>([]);

  useEffect(() => {
    if (parameters) {
      const arr: ParameterResponse[] = [];

      previousParameters?.forEach((parameter: any) => {
        const _parameter = parameters.find((p) => p.id === parameter.id)!;
        arr.push(_parameter);
      });

      setSelected(arr);
    }
  }, [parameters, previousParameters, setSelected]);

  const handleSaveSelection = () => {
    setSelectedParameter(selected);
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Selecionar parâmetro</DialogTitle>
      <DataTable
        rows={parameters ?? []}
        columns={columns}
        title="Parâmetros"
        options={{
          onSelectedItems: setSelected,
          previousItems: selected,
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
