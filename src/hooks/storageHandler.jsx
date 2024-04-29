import { useDispatch } from "react-redux";
import { setFavoritesListRED } from "../redux/client/favoritesSlice";
import { setCartListRED } from "../redux/client/cartSlice";
import { isClient } from "../utils/utils";
import { deleteFromCart, postCartData } from "../services/website/basket";
import { useAuth } from "./customHooks";
import Swal from "sweetalert2";

export default function storageHandler() {
  const dispatch = useDispatch();
  const { loggedUser } = useAuth();

  const handleLocalStorageData = async (e, key, product) => {
    e.stopPropagation();

    let storageData = JSON.parse(localStorage.getItem(key)) || [];
    let updatedData = [...storageData];

    if (Array.isArray(storageData)) {
      if (storageData.some((item) => item._id === product._id)) {
        if (loggedUser && isClient(loggedUser) && key === "cart") {
          Swal.fire({
            title: `${product.brand} | ${product.title}`,
            text: `
              You are going to remove from the shopping cart.. 
              Are you sure?
            `,
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it.",
          }).then((result) => {
            if (result.isConfirmed) {
              updatedData = storageData.filter(
                (item) => item._id !== product._id
              );
              deleteFromCart(product.serverId);
              localStorage.setItem(key, JSON.stringify(updatedData));
              dispatch(setCartListRED(updatedData));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        } else {
          updatedData = storageData.filter((item) => item._id !== product._id);
          localStorage.setItem(key, JSON.stringify(updatedData));
          dispatch(setCartListRED(updatedData));
        }
      } else {
        updatedData.push({ ...product, productCount: 1 });

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
      updatedData.push(product);
    }

    localStorage.setItem(key, JSON.stringify(updatedData));

    key === "cart"
      ? dispatch(setCartListRED(updatedData))
      : dispatch(setFavoritesListRED(updatedData));
  };

  return { handleLocalStorageData };
}
