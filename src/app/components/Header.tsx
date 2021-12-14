import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ToolBar from '@mui/material/Toolbar'
import UserIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import FullScreenIcon from '@mui/icons-material/Fullscreen'
import NotificationIcon from '@mui/icons-material/Notifications'
import Modal from '@mui/material/Modal'
import { useLayout } from 'app/hooks/useLayout'
// import UserSettings from './UserSettings';
import Logo from 'app/assets/logo-white.svg'
import { useAuth } from 'app/hooks/useAuth'
import { useFullscreen } from '@straw-hat/react-fullscreen'

const Header: React.FC = () => {
  const target = useRef(window.document.body)
  const { toggleFullscreen } = useFullscreen(target)
  const navigate = useNavigate()
  const [showUserSettings, setShowUserSettings] = useState(false)
  const { signout } = useAuth()

  const { toggleDrawer, isMobile } = useLayout()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClose = () => setAnchorEl(null)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOpenUserSettings = () => {
    handleMenuClose()
    setShowUserSettings(true)
  }

  const handleCloseUserSettings = () => {
    setShowUserSettings(false)
  }

  const handleLogout = () => {
    signout()
    navigate('/')
  }

  const handleFullScreen = () => {
    toggleFullscreen()
  }

  const menuId = 'account-menu'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{
        top: 0,
        left: 0,
        zIndex: 1000
      }}>
        <ToolBar>

          {
            isMobile && (
              <IconButton size="large" color="inherit" onClick={toggleDrawer} >
                <MenuIcon />
              </IconButton>
            )
          }

          <Link to="/zeno">
            <img alt="Logo" src={Logo} width={48} height={48} />
          </Link>

          <Box sx={{
            flexGrow: 1
          }} />

          <IconButton size="large" color="inherit" onClick={handleFullScreen}>
            <FullScreenIcon />
          </IconButton>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <UserIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleOpenUserSettings}>Configurações</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </ToolBar>
      </AppBar>

      {/* <Modal open={showUserSettings} onClose={handleCloseUserSettings}>
                <UserSettings closeModal={handleCloseUserSettings} />
            </Modal> */}
    </Box>
  )
}

export default Header
