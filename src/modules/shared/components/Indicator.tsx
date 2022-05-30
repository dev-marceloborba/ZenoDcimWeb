import React, { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import DashboardCard from './DashboardCard'

export type IndicatorProps = {
  text: string
  value: number | string
  Icon?: SvgIconProps
  size?: 'normal' | 'small'
}

const Indicator: React.FC<IndicatorProps> = ({ size = 'normal', ...props }) => {
  return (
    <DashboardCard>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography>
          {props.text}
        </Typography>

        <Typography variant={size === 'normal' ? 'h2' : 'h4'}>
          {props.value}
        </Typography>
      </Box>
      {
        props.Icon
      }
    </DashboardCard>
  )
}

export default Indicator
