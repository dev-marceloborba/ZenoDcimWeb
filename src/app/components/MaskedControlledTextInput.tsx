import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

type MaskedControlledTextInputProps = TextFieldProps & {
  mask: string;
};

const MaskedControlledTextInput: React.FC<MaskedControlledTextInputProps> = ({
  ...props
}) => {
  const { control } = useFormContext();
  const { name, defaultValue, mask } = props;

  const CustomInputMask = React.forwardRef<NumberFormat, CustomProps>(
    function NumberFormatCustom(props, ref) {
      const { onChange, ...other } = props;

      return (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          format={mask}
          allowEmptyFormatting
          mask="_"
          isNumericString
        />
      );
    }
  );

  return (
    <Controller
      name={name ?? ""}
      control={control}
      defaultValue={defaultValue ? defaultValue : ""}
      render={({ field, formState: { errors } }) => (
        <TextField
          variant="outlined"
          fullWidth
          error={!!errors[name ?? ""]?.message}
          helperText={errors[name ?? ""]?.message}
          InputProps={{ inputComponent: CustomInputMask as any }}
          {...props}
          {...field}
        />
      )}
    />
  );
};

export default MaskedControlledTextInput;
