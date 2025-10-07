import { Container, styled, Typography, Button, Box, Avatar, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Logo } from "./Logo"
import { useAuthStore } from "../../store/useAuthStore"

const HeaderWrapper = styled('header')`
  width: 100%;
  min-height: 55px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
`
const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 55px;
  padding: 8px;
`

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate('/')
  }

  const handleLogin = () => {
    navigate('/auth')
  }

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo />
        <Typography>Skeleton Micronaut React</Typography>
        
        <Box>
          {isAuthenticated ? (
            <>
              <Button
                onClick={handleMenuOpen}
                color="inherit"
                startIcon={<Avatar sx={{ width: 24, height: 24 }}>{user?.name?.[0]}</Avatar>}
              >
                {user?.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button onClick={handleLogin} color="inherit">
              Login
            </Button>
          )}
        </Box>
      </HeaderContainer>
    </HeaderWrapper>
  )
}