import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from './layouts/DefaultLayout';
import { BookPage } from "./pages/BookPage/BookPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useThemeStore } from "./store/useThemeStore";
import { darkTheme, lightTheme } from "./theme";

export const queryClient = new QueryClient();

export const Router = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = mode === "light" ? lightTheme : darkTheme;
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/books" 
                element={
                  <ProtectedRoute>
                    <BookPage />
                  </ProtectedRoute>
                } 
              />  
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Router;