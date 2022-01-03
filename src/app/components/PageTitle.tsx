import React from 'react'
import Typrography from '@mui/material/Typography'

const PageTitle: React.FC = ({children}) => {
    return <Typrography variant="h4">{children}</Typrography>
}

export default PageTitle