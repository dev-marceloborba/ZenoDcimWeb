import React from "react";
import Button from "@mui/material/Button";
import { readFile } from "app/utils/excel.handler";
import { SxProps, Theme } from "@mui/material";

type ImportButtonProps = {
  sx?: SxProps<Theme>;
  onDataReceived(data: any): any;
};

const ImportButton: React.FC<ImportButtonProps> = ({ sx, onDataReceived }) => {
  const handleFileChange = async (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      const result = (await readFile(files[0])) as Array<any>;
      return onDataReceived(result);
    }
  };

  return (
    <>
      <input
        id="import-button"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept={SheetJSFT}
      />
      <Button
        variant="contained"
        component="label"
        sx={sx}
        htmlFor="import-button"
      >
        Importar
      </Button>
    </>
  );
};

export default ImportButton;

const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map((x) => `.${x}`)
  .join(",");
