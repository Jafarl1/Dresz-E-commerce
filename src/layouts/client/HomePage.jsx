import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import DataContainer from "./data-container/DataContainer";
import Loader from "../components/Loader";

function HomePage() {
  const { loggedUser } = useAuth();

  const brands = useSelector((state) => state.brands);
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  let updatedProducts = products
    .map((product) => ({
      ...product,
      serverId: cart.find((el) => el._id === product._id)?.serverId || null,
    }))
    .filter((product) => product.isPublish);

  const data = {
    brands,
    products: updatedProducts,
  };

  function isDataLoaded() {
    return brands && products && brands.length > 0 && products.length > 0;
  }

  return isDataLoaded() ? <DataContainer data={data} /> : <Loader />;
}

export default HomePage;
