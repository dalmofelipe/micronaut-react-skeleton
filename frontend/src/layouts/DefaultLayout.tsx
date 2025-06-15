import { Box, styled } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "./components/Header"

const DefaultLayoutWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`

export const DefaultLayout = () => {
  return (
    <DefaultLayoutWrapper>
      <Header />

      <Outlet />
    </DefaultLayoutWrapper>
  )
}
