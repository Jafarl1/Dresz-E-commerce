import { useState, createContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const ifDark = (value) => (dark ? value : "");

  const value = { dark, ifDark, setDark };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
