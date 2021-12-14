import React from 'react'
import { InputProps } from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Controller } from 'react-hook-form'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'

type ComboboxItem = {
    value: string | number
    descripton: string
}

type ComboboxProps = {
    name: string
    label: string
    values: ComboboxItem[]
    errorMessage?: string
    sx?: SxProps<Theme>
}

const ComboBox: React.FC<ComboboxProps> = (props) => {
    return (
        <FormControl fullWidth sx={props.sx}>
            <InputLabel>{props.label}</InputLabel>
            <Controller
                // control={props.control}
                name={props.name}
                rules={{ required: props.errorMessage }}
                render={({ field: { onChange, value }, fieldState: { error } }) =>
                    <Select
                        value={value}
                        onChange={onChange}
                        label={props.label}
                    >
                        {
                            props.values.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.descripton}</MenuItem>
                            ))
                        }
                    </Select>
                } />
        </FormControl>
    )
}

export default ComboBox
