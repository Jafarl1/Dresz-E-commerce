import { useSelector } from "react-redux";
import DataContainer from "./data-container/DataContainer";
import Loader from "../components/Loader";
import { updateProducts } from "../../utils/utils";

function Sale() {
  const products = useSelector((state) => state.products);
  const brands = useSelector((state) => state.brands);
  const cart = useSelector((state) => state.cart);

  let updatedProducts = products
    .map((product) => ({
      ...product,
      serverId: cart.find((el) => el._id === product._id)?.serverId || null,
    }))
    .filter((product) => product.isPublish);

  console.log(updateProducts(products, cart, "new"));

  const data = {
    brands,
    products: updateProducts(products, cart, "new"),
  };

  function isDataLoaded() {
    return brands && products && brands.length > 0 && products.length > 0;
  }

  return isDataLoaded() ? <DataContainer data={data} /> : <Loader />;
}

export default Sale;
