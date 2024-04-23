import { useSelector } from "react-redux";
import DataContainer from "./data-container/DataContainer";
import Loader from "../components/Loader";
import useAuth from "../../hooks/useAuth";
import { isClient } from "../../utils/utils";

function Favorites() {
  const { loggedUser } = useAuth();
  const cart = useSelector((state) => state.cart);
  const brands = useSelector((state) => state.brands);

  const data = {
    brands,
    products: cart,
  };

  function isDataLoaded() {
    return brands && cart && brands.length > 0 && cart.length > 0;
  }

  return isDataLoaded() ? (
    <DataContainer data={data} />
  ) : brands.length > 0 && cart.length === 0 ? (
    <h1
      style={{
        width: "100%",
        textAlign: "center",
        margin: "40px 0",
      }}
    >
      No products found.
    </h1>
  ) : (
    <Loader />
  );
}

export default Favorites;
