import { Container, styled, Typography } from "@mui/material"
import { Logo } from "./Logo"

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
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo />
        <Typography>Skeleton Micronaut React</Typography>
      </HeaderContainer>
    </HeaderWrapper>
  )
}