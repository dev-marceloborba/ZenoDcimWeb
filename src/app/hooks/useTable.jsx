import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({ rows, columns, ...props }) => {
  let fields = [];
  let alteredColumns = [];
  const { showActions, editPage, handleDelete } = props;
  const [selectedRow, setSelectedRow] = React.useState(null);

  const navigate = useNavigate();

  if (showActions) {
    alteredColumns = [...columns];
    alteredColumns.push({
      label: "Ações",
      name: "actions",
      align: "right",
    });
    fields = alteredColumns.map((column) => column.name);
  } else {
    alteredColumns = [...columns];
    fields = columns.map((column) => column.name);
  }

  const handleEdit = (row) => {
    navigate({
      pathname: editPage,
      search: `?${createSearchParams(row)}`,
    });
  };

  const handleShowModal = (row) => {
    setSelectedRow(row)
  };

  const handleClose = () => {
    setSelectedRow(null)
  };

  const handleConfirmDeletion = () => {
    handleDelete(selectedRow)
    handleClose()
  }

  const renderActions = (row, key) => (
    <TableCell key={key} align="right">
      <Box component="div">
        <IconButton onClick={() => handleEdit(row)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => handleShowModal(row)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </TableCell>
  );

  const renderField = (data, key, index) => {
    return (
      <TableCell
        key={key}
        align="right"
        {...(index === 0 && {
          align: "left",
          component: "th",
          scope: "row",
        })}
      >
        {data}
      </TableCell>
    );
  };

  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            {alteredColumns.map((column) => (
              <TableCell key={column.label} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => {
            return (
              <TableRow key={row.id}>
                {fields.map((field, index) => {
                  if (field !== "actions") {
                    return renderField(
                      row[field],
                      `${row[field]}-${index}`,
                      index
                    );
                  } else {
                    return renderActions(row, `${row[field]}-${index}`);
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
      <Dialog
        open={!!selectedRow}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar ação
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja apagar o registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Fechar</Button>
          <Button variant="contained" onClick={handleConfirmDeletion} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default Table;
