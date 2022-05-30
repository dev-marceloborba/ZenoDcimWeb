import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const DashboardCard: React.FC = ({ children }) => {
  return (
    <Paper sx={{
      p: 1,
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
          px: 1
        }}>
        {
          children
        }
      </Box>
    </Paper>
  )
}

export default DashboardCard
