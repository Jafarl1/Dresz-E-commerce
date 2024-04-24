import { useDispatch } from "react-redux";
import { setFavoritesListRED } from "../redux/client/favoritesSlice";
import { setCartListRED } from "../redux/client/cartSlice";
import { isClient } from "../utils/utils";
import { deleteFromCart, postCartData } from "../services/website/basket";
import useAuth from "./useAuth";

function useStorage() {
  const dispatch = useDispatch();
  const { loggedUser } = useAuth();

  const handleLocalStorageData = async (e, key, product) => {
    e.stopPropagation();

    let storageData = JSON.parse(localStorage.getItem(key)) || [];
    let updatedData;

    if (Array.isArray(storageData)) {
      if (storageData.some((item) => item._id === product._id)) {
        updatedData = storageData.filter((item) => item._id !== product._id);

        if (loggedUser && isClient(loggedUser) && key === "cart") {
          deleteFromCart(product.serverId);
        }
      } else {
        updatedData = [...storageData, product];

        if (loggedUser && isClient(loggedUser) && key === "cart") {
          postCartData({
            basket: [
              {
                productId: product._id,
                productCount: 1,
              },
            ],
          });
        }
      }
    } else {
      updatedData = [storageData, product];
    }

    localStorage.setItem(key, JSON.stringify(updatedData));

    key === "cart"
      ? dispatch(setCartListRED(updatedData))
      : dispatch(setFavoritesListRED(updatedData));
  };

  return { handleLocalStorageData };
}

export default useStorage;
