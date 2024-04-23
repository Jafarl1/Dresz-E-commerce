import { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoadingRED } from "../redux/loading/loadingSlice";
import { getLoggedUserDataByToken } from "../services/auth";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState();

  const dispatch = useDispatch();

  async function awaitForUserData() {
    dispatch(setLoadingRED(true));
    const token = localStorage.getItem("access_token");
    const response = await getLoggedUserDataByToken(token);

    if (response) {
      setLoggedUser(response.data.data.user);
    } else {
      setLoggedUser(null);
    }
  }

  useEffect(() => {
    if (loggedUser || loggedUser === null) {
      dispatch(setLoadingRED(false));
    }
  }, [loggedUser]);

  useEffect(() => {
    awaitForUserData();
  }, []);

  const value = {
    loggedUser,
    setLoggedUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
