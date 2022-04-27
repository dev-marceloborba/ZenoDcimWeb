import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useListAllParametersQuery } from "app/services/datacenter";
import Loading from "app/components/Loading";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";
import { EquipmentParameterResponse } from "app/models/data-center.model";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = parameters?.map((n) => n)!;
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    row: EquipmentParameterResponse
  ) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected: EquipmentParameterResponse[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (row: EquipmentParameterResponse) =>
    selected.indexOf(row) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (parameters?.length || 0))
      : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Selecionar parâmetro</DialogTitle>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
              })}
            >
              <TableCell padding="checkbox">
                <Checkbox color="primary" onChange={handleSelectAllClick} />
              </TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="right">Unidade</TableCell>
              <TableCell align="right">Limite mínimo</TableCell>
              <TableCell align="right">Limite máximo</TableCell>
              <TableCell align="right">Escala</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={(theme) => ({
              " &  .MuiTableRow-root:hover": {
                backgroundColor: theme.palette.background.paper,
              },
            })}
          >
            {parameters
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((parameter) => {
                const isItemSelected = isSelected(parameter);
                return (
                  <TableRow
                    key={parameter.id}
                    onClick={(event) => handleClick(event, parameter)}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    <TableCell align="left">{parameter.name}</TableCell>
                    <TableCell align="right">{parameter.unit}</TableCell>
                    <TableCell align="right">{parameter.lowLimit}</TableCell>
                    <TableCell align="right">{parameter.highLimit}</TableCell>
                    <TableCell align="right">{parameter.scale}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={parameters?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button variant="contained" onClick={handleSaveSelection}>
        Selecionar
      </Button>
      <Loading open={isLoading} />
    </Dialog>
  );
};

export default ParameterSelection;
