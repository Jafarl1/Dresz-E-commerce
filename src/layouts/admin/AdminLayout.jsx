// import { useState, useEffect } from "react";
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import { isAdminOrSuperadmin } from "../../utils/utils";
// import Loader from "../components/Loader";
// import AdminSignIn from "./AdminSignIn";

// function AdminLayout() {
//   const { loading, setLoading, loggedUser } = useAuth();
//   const { pathname } = useLocation();
//   const [isAdminLogged, setIsAdminLogged] = useState();

//   // function clearPathname() {
//   //   return pathname.replaceAll("/", "") === "admin";
//   // }

//   const boolean = function isAdminLogged() {
//     return loggedUser && isAdminOrSuperadmin(loggedUser);
//   };

//   console.log("ADMIN LAYOUT IS RENDERED");

//   useEffect(() => {
//     setLoading(true);
//     console.log(boolean);
//     setIsAdminLogged(loggedUser && isAdminOrSuperadmin(loggedUser));
//     setLoading(false);
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : isAdminLogged ? (
//         <Navigate to="admins_cabinet" replace={true} />
//       ) : !isAdminLogged ? (
//         // <Navigate to="admins_signin" replace={true} />
//         <AdminSignIn />
//       ) : (
//         // <AdminSignIn />
//         <Outlet />
//       )}
//     </>
//   );
// }

// export default AdminLayout;
//============================================================================
// import { useState, useEffect } from "react";
// import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../redux/loading/loadingSlice";
// import { isAdminOrSuperadmin } from "../../utils/utils";
// import Loader from "../components/Loader";
// import AdminSignIn from "./AdminSignIn";
// import AdminsCabinet from "./AdminsCabinet";
// import { getLoggedUserDataByToken } from "../../services/auth";

// function AdminLayout() {
//   const { loggedUser } = useAuth();
//   const loading = useSelector((state) => state.loading);
//   const dispatch = useDispatch();

//   // const [loggedUser, setLoggedUser] = useState();
//   // async function awaitForUserData() {
//   //   // setLoading(true);
//   //   const token = localStorage.getItem("access_token");
//   //   const response = await getLoggedUserDataByToken(token);

//   //   if (response) {
//   //     setLoggedUser(response.data.data.user);
//   //   } else {
//   //     setLoggedUser(null);
//   //   }
//   //   // setLoading(false);
//   // }

//   useEffect(() => {
//     dispatch(setLoading(true));
//     dispatch(setLoading(false));
//   }, []);

//   if (loading || loggedUser === undefined) {
//     return <Loader />;
//   }
//   if (loggedUser && isAdminOrSuperadmin(loggedUser)) {
//     return <AdminsCabinet />;
//   }
//   if (loggedUser === null || !isAdminOrSuperadmin(loggedUser)) {
//     return <AdminSignIn />;
//   }
//   return <Outlet />;
// }

// export default AdminLayout;

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { isAdminOrSuperadmin, isClient } from "../../utils/utils";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function AdminLayout() {
  const { loggedUser } = useAuth();
  const loadingRed = useSelector((state) => state.loading);

  if (loadingRed || loggedUser === undefined) return <Loader />;

  if (loggedUser === null || isClient(loggedUser)) {
    return (
      <>
        <Navigate to="admins_signin" replace={true} />;
        <Outlet />;
      </>
    );
  }

  if (loggedUser && isAdminOrSuperadmin(loggedUser)) {
    return (
      <>
        <Navigate to="admins_cabinet" replace={true} />;
        <Outlet />;
      </>
    );
  }
}

export default AdminLayout;
