import { useSelector } from "react-redux";
import DataContainer from "./data-container/DataContainer";
import Loader from "../components/Loader";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const brands = useSelector((state) => state.brands);

  const data = {
    brands,
    products: favorites,
  };

  function isDataLoaded() {
    return brands && favorites && brands.length > 0 && favorites.length > 0;
  }

  return isDataLoaded() ? (
    <DataContainer data={data} />
  ) : brands.length > 0 && favorites.length === 0 ? (
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
