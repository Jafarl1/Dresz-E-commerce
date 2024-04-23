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
        <Navigate to="admins_signin" replace={true} />
        <Outlet />
      </>
    );
  }

  if (loggedUser && isAdminOrSuperadmin(loggedUser)) {
    return (
      <>
        <Navigate to="admins_cabinet" replace={true} />
        <Outlet />
      </>
    );
  }
}

export default AdminLayout;
