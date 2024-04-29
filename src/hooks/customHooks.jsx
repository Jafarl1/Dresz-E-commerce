import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import storageHandler from "./storageHandler";

export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);
export const useStorage = () => storageHandler();
