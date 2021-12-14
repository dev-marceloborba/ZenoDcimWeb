import React from 'react'
import { InputProps } from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'

type ComboboxItem = {
    value: string | number
    descripton: string
}

type TextInputProps = {
    name: string
    errorMessage?: string
    label: string
    obscureText?: boolean
    autoFocus?: boolean
    defaultValue?: string
    inputProps?: InputProps
    items?: ComboboxItem[]
    sx?: SxProps<Theme>
}

const TextInput: React.FC<TextInputProps> = (props) => {
    return (
        <TextField
            margin="normal"
            // required
            fullWidth
            id={props.name}
            // autoComplete={props.name}
            autoFocus={props.autoFocus ?? false}
            variant="outlined"
            label={props.label}
            error={!!props.errorMessage}
            type={props.obscureText ? 'password' : 'text'}
            helperText={props.errorMessage ? props.errorMessage : null}
            select={!!props.items?.length}
            InputProps={props.inputProps}
            sx={props.sx}
            defaultValue={props.defaultValue}
        >
            {
                props.items?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>{item.descripton}</MenuItem>
                ))
            }
        </TextField>
    )
}

export default TextInput
