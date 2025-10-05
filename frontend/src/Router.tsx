import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from './layouts/DefaultLayout';
import { BlogEditPage } from "./pages/BlogPage/BlogEditPage";
import { BlogListPage } from "./pages/BlogPage/BlogListPage";
import { BlogPostPage } from "./pages/BlogPage/BlogPostPage";
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
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<BlogListPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/new" element={<BlogEditPage />} />
              <Route path="/blog/edit/:slug" element={<BlogEditPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Router;