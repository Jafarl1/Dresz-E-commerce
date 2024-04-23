import { useLocation, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function ClientLayout() {
  const { loading } = useAuth();
  const { pathname } = useLocation();

  function clearPathname() {
    return pathname.replaceAll("/", "") === "layout";
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      {clearPathname() ? <HomePage /> : <Outlet />}
      <Footer />
    </>
  );
}

export default ClientLayout;
