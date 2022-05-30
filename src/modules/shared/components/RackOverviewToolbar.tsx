import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

type ToolbarOptions = 'normal' | 'thermal' | 'events'

const RackOverviewToolbar: React.FC = () => {
    const [value, setValue] = React.useState<ToolbarOptions>('normal')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value as ToolbarOptions)
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Modo</FormLabel>
            <RadioGroup
                row
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                <FormControlLabel value="thermal" control={<Radio />} label="Termográfico" />
                <FormControlLabel value="events" control={<Radio />} label="Eventos" />
            </RadioGroup>
        </FormControl>
    )
}

export default RackOverviewToolbar

