import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector, setTheme } from "@/store";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("cc-theme") as "light" | "dark" | null;
    if (saved && saved !== mode) dispatch(setTheme(saved));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("cc-theme", mode);
  }, [mode]);

  return <>{children}</>;
}
