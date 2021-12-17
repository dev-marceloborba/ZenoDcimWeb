import React from "react";
import { TextField, TextFieldProps } from "formik-mui";
import MuiTextField from "@mui/material/TextField";
import InputMask from "react-input-mask";

const MaskedTextField = ({ ...props }) => (
  <InputMask mask={"9999-9999"}>
    {(innerProps: JSX.IntrinsicAttributes & TextFieldProps) => (
      <TextField {...props} {...innerProps} />
    )}
  </InputMask>
);

export default MaskedTextField;
