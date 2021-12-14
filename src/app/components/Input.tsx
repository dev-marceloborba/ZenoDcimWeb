import React from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Controller, useForm } from 'react-hook-form'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'

type ComboboxItem = {
  value: string | number
  descripton: string
}

type InputProps = {
  control: any;
  name: string;
  errorMessage: string;
  label: string;
  obscureText?: boolean;
  autoFocus?: boolean;
  sx?: SxProps<Theme>
  values?: ComboboxItem[]
  select?: boolean
}

const Input: React.FC<InputProps> = (props) => {
  const { formState, getValues, watch, register } = useForm()
  return (
    <TextField
      select={props.select}
      fullWidth
      label={props.label}
      inputProps={register('prop', {
        required: 'Este campo é obrigatório'
      })}

    >
      {
        props.values?.map((item) => (
          <MenuItem key={item.value} value={item.value}>{item.descripton}</MenuItem>
        ))
      }
    </TextField>
  )
}
//         <Controller
//             name={props.name}
//             control={props.control}
//             defaultValue=""
//             rules={{ required: props.errorMessage }}
//             render={({ field: { onChange, value }, fieldState: { error } }) =>
//                 <TextField
//                     select={props.select}
//                     margin="normal"
//                     required
//                     fullWidth
//                     id={props.name}
//                     autoComplete={props.name}
//                     autoFocus={props.autoFocus ?? false}
//                     variant="outlined"
//                     label={props.label}
//                     value={value}
//                     onChange={onChange}
//                     error={!!error}
//                     type={props.obscureText ? 'password' : 'text'}
//                     helperText={error ? error.message : null}
//                 >
//                     {
//                         props.values?.map((item) => (
//                             <MenuItem key={item.value} value={item.value}>{item.descripton}</MenuItem>
//                         ))
//                     }
//                 </TextField>
//             }
//         />
//   )
// }

export default Input
