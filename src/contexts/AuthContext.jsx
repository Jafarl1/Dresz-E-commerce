import { useState, useContext, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

// import { useState, useContext, createContext, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoadingRED } from "../redux/loading/loadingSlice";
// import { getLoggedUserDataByToken } from "../services/auth";

// const AuthContext = createContext();

// export function AuthContextProvider({ children }) {
//   // console.log("AUTH CONTEXT IS RENDERED");
//   const [loading, setLoading] = useState(false);
//   const [loggedUser, setLoggedUser] = useState();

//   const dispatch = useDispatch();
//   const loadingRed = useSelector((state) => state.loading);

//   console.log("loadingRed before: ", loadingRed);

//   async function awaitForUserData() {
//     dispatch(setLoadingRED(true));
//     // setLoading(true);
//     const token = localStorage.getItem("access_token");
//     const response = await getLoggedUserDataByToken(token);

//     if (response) {
//       setLoggedUser(response.data.data.user);
//     } else {
//       setLoggedUser(null);
//     }

//     if (loggedUser || loggedUser === null) {
//       dispatch(setLoadingRED(false));
//     }

//     // setLoading(false);
//   }

//   console.log("loadingRed after: ", loadingRed);

//   useEffect(() => {
//     awaitForUserData();
//   }, []);

//   console.log("loggedUser: ", loggedUser);

//   const value = {
//     loading,
//     setLoading,
//     loggedUser,
//     setLoggedUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export default AuthContext;

// export function useAuth() {
//   return useContext(AuthContext);
// }
