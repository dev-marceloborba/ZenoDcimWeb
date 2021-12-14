import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type UserSettingsProps = {
  closeModal(): void;
}

type Languages = 'portuguese' | 'english' | 'spanish';

const UserSettings: React.FC<UserSettingsProps> = ({ closeModal }) => {
  const [language, setLanguage] = useState<Languages>('portuguese')

  const handleChangeLanguage = (event: SelectChangeEvent<Languages>) => {
    setLanguage(event.target.value as Languages)
  }

  const handleSaveSettings = () => {
    closeModal()
  }

  const handleCloseSettings = () => {
    closeModal()
  }

  return (
    <Box component="div" sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 3
    }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Configurações de usuário
      </Typography>
      {/* <Grid container justifyContent="space-between">
                <Grid item>
                    <Typography>
                        Modo escuro
                    </Typography>
                </Grid>
                <Grid item>
                    <Switch />
                </Grid>

            </Grid> */}

      <Box component="div" sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography>
          Modo escuro
        </Typography>
        <Switch />
      </Box>

      <Box component="div" sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2
      }}>
        <Typography>
          Idioma
        </Typography>
        <Select
          // label="Idioma"
          value={language}
          onChange={handleChangeLanguage}
        >
          <MenuItem value={'portuguese'}>Português</MenuItem>
          <MenuItem value={'english'}>Inglês</MenuItem>
          <MenuItem value={'spanish'}>Espanhol</MenuItem>
        </Select>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSaveSettings}>Salvar</Button>
        <Button variant="contained" color="secondary" onClick={handleCloseSettings}>Cancelar</Button>
      </Box>
    </Box >
  )
}

export default UserSettings
