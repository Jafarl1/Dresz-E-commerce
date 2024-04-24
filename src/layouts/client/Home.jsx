import { useSelector } from "react-redux";
import { updateProducts } from "../../utils/utils";
import DataContainer from "./data-container/DataContainer";
import Loader from "../components/Loader";

function Home() {
  const products = useSelector((state) => state.products);
  const brands = useSelector((state) => state.brands);
  const cart = useSelector((state) => state.cart);

  const data = {
    brands,
    products: updateProducts(products, cart),
  };

  function isDataLoaded() {
    return brands && products && brands.length > 0 && products.length > 0;
  }

  return isDataLoaded() ? <DataContainer data={data} /> : <Loader />;
}

export default Home;
