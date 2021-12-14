import React from 'react'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListSubHeader from '@mui/material/ListSubheader'

import { useLayout } from 'app/hooks/useLayout'
import ListItemLink, { ListItemLinkProps } from './ListItemLink'

// icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdminIcon from '@mui/icons-material/BarChart'
import ServiceOrderIcon from '@mui/icons-material/Assignment'

const Sidenav: React.FC = () => {

  const { drawerOpened } = useLayout()

  if (drawerOpened) {
    return (
      <Drawer anchor="left" variant="permanent" open={false} sx={{
        '.MuiPaper-root': {
          mt: '4rem',
          width: '220px'
        }
      }}>
        <List>
          {
            menuItems.map((props, index) => (
              <ListItemLink key={index} {...props} />
            ))
          }
        </List>
      </Drawer>)
  } else {
    return (<>
    </>)
  }
}

const menuItems: ListItemLinkProps[] = [
  {
    to: "/zeno/admin",
    primary: "Admin",
    icon: < AdminIcon />
  },
  {
    to: "/zeno/dashboard",
    primary: "Dashboard",
    icon: <DashboardIcon />
  },
  {
    primary: "Racks",
    icon: <DashboardIcon />,
    items:
      [
        { primary: 'Listagem', to: '/zeno/racks' },
        { primary: 'Visão geral', to: '/zeno/racks/overview' }
      ]
  },
  {
    primary: "Automação",
    icon: < DashboardIcon />,
    items:
      [
        { primary: "Lista de CLP's", to: "/zeno/clp/list" },
        { primary: "Novo CLP", to: "/zeno/clp/new" },
        { primary: "Lista de Tags Modbus", to: "/zeno/modbus-tag/list" },
        { primary: "Novo Tag Modbus", to: "/zeno/modbus-tag/new" },
      ]
  },
  {
    to: "/zeno/service-order",
    primary: "Ordem de serviço",
    icon: <ServiceOrderIcon />
  }
]

export default Sidenav
