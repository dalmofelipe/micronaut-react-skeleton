import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { ThemeToggleButton } from "../../components/ThemeToggleButton";
import { BoxCounter } from "./components/BoxCounter/BoxCounter";
import { TechLogos } from "./components/TechLogos/TechLogos";

const HomeWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 25px;
`
const HomeButtons = styled('div')`
  display: flex;
  justify-content: center;
  gap: 34px;
  width: 100%;
`

export const HomePage = () => {
  
  const handleOnClick = () => {
    console.log('navitage to book page')
  }

  return (
    <HomeWrapper>
      <TechLogos />
      <Typography variant="h3">Vite + React + Axios</Typography>
      <Typography variant="h4">React Query + Zustand + MUI</Typography>
      <BoxCounter />

      <HomeButtons>
        <ThemeToggleButton />

        <Link to={'/books'}>
          <Button variant="contained" color="primary" onClick={handleOnClick}>
            Books
          </Button>
        </Link>
      </HomeButtons>
    </HomeWrapper>
  );
}