import Button from "@mui/material/Button";
import Row from "app/components/Row";
import { NavigateFunction } from "react-router-dom";
import tableNavigation from "./tableNavigation";

const tableActions = (navigate: NavigateFunction, editPage: string) => ({
  name: "actions",
  label: "Ações",
  options: {
    filter: false,
    sort: false,
    empty: false,
    customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
      const onDetailsClick = () => {
        const { rowData, value } = tableMeta;
        // console.log(tableMeta);
        console.log(value);
        // tableNavigation(rowData, navigate, editPage);
      };

      return (
        <Row
          sx={{
            " & .MuiButton-root": {
              fontSize: "0.75rem",
            },
            " & .MuiButton-root:nth-child(even)": {
              margin: "0 12px",
            },
          }}
        >
          <Button variant="outlined" color="info" onClick={onDetailsClick}>
            Detalhes
          </Button>
          <Button variant="outlined">Editar</Button>
          <Button variant="outlined" color="error">
            Apagar
          </Button>
        </Row>
      );
    },
  },
});

export default tableActions;
