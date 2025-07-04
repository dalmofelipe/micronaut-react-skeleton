import { create } from "zustand";
import { lightTheme, darkTheme } from "../theme";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: typeof lightTheme;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "dark",
  toggleTheme: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
    })),
  get theme() {
    return get().mode === "light" ? lightTheme : darkTheme;
  },
}));