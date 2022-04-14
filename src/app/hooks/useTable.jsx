import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

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
import NoDataText from "app/components/NoDataText";

import Row from "app/components/Row";

const Table = ({ rows, columns, ...props }) => {
  let fields = [];
  let alteredColumns = [];
  let alteredRows = [];
  const {
    showActions,
    showCustomComponent,
    editPage,
    handleDelete,
    onRowClick,
  } = props;
  const [selectedRow, setSelectedRow] = React.useState(null);

  const navigate = useNavigate();

  const renderActions = (row, key) => (
    <Row>
      <IconButton onClick={() => handleEdit(row)}>
        <EditIcon />
      </IconButton>

      <IconButton onClick={() => handleShowModal(row)}>
        <DeleteIcon />
      </IconButton>
    </Row>
  );

  if (showActions) {
    alteredColumns = [...columns];
    alteredColumns.push({
      label: "Ações",
      name: "actions",
      align: "right",
    });
    fields = alteredColumns.map((column) => column.name);
    alteredRows = rows?.map((row, index) => ({
      ...row,
      actions: renderActions(row, index),
    }));
  } else {
    alteredColumns = [...columns];
    fields = columns.map((column) => column.name);
    alteredRows = rows;
  }

  const handleEdit = (row) => {
    console.log("***-> edit");
    navigate({
      pathname: editPage,
      search: `?${createSearchParams(row)}`,
    });
  };

  const handleShowModal = (row) => {
    setSelectedRow(row);
  };

  const handleClose = () => {
    setSelectedRow(null);
  };

  const handleConfirmDeletion = () => {
    handleDelete(selectedRow);
    handleClose();
  };

  const handleOnClickRow = (row) => {
    console.log("***-> click row");
    if (onRowClick) {
      onRowClick(row);
    }
  };

  // const renderCustomComponent = (Component, key, ...props) => {
  //   return (
  //     <TableCell key={key} align="right">
  //       <Component {...props} />
  //     </TableCell>
  //   );
  // };

  const renderField = (data, key, index, field) => {
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
    <Card>
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
            {alteredRows?.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={(theme) => ({
                    cursor: "pointer",
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                    transition: "background-color 0.1s ease-in-out",
                    zIndex: 1,
                  })}
                  onClick={() => handleOnClickRow(row)}
                >
                  {fields.map((field, index) => {
                    return renderField(
                      row[field],
                      `${row[field]}-${index}`,
                      index,
                      field
                    );
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
          <DialogTitle id="alert-dialog-title">Confirmar ação</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja apagar o registro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Fechar
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmDeletion}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        {alteredRows?.length === 0 && <NoDataText />}
      </TableContainer>
    </Card>
  );
};

export default Table;
