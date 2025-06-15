import { Button } from "@mui/material";
import { useThemeStore } from "../store/useThemeStore";

export const ThemeToggleButton = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  
  return <Button variant="contained" color="info" onClick={toggleTheme}>
    Alternar tema
  </Button>;
}