import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getBrandNameById, isClient } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritesListRED } from "../../../redux/client/favoritesSlice";
import { setCartListRED } from "../../../redux/client/cartSlice";
import searchIcon from "../../../assets/icons/search-icon.png";
import favoriteIcon from "../../../assets/icons/favorite-icon.png";
import inFavoritesIcon from "../../../assets/icons/in-favorites-icon.png";
import cartIcon from "../../../assets/icons/cart-icon.png";
import inCartIcon from "../../../assets/icons/in-cart-icon.png";
import outOfCartIcon from "../../../assets/icons/out-of-cart-icon.png";
import "./data-container.css";
import useAuth from "../../../hooks/useAuth";
import {
  deleteProductInCart,
  postCartData,
} from "../../../services/website/basket";
import { setLoadingRED } from "../../../redux/loading/loadingSlice";
import Loader from "../../components/Loader";

function DataContainer({ data }) {
  const [formattedData, setFormattedData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { loggedUser } = useAuth();
  const favoritesRed = useSelector((state) => state.favorites);
  const cartRed = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const formatData = () => {
    const formatted = data.products.map((product) => {
      return {
        ...product,
        brand: getBrandNameById(product.brandId, data.brands),
      };
    });

    setFormattedData(formatted);
    setFilteredProducts(formatted);
  };

  const getSearchedData = (e) => {
    const value = e.target.value.toLowerCase();

    if (value.trim().length) {
      const filtered = formattedData.filter(
        (product) =>
          product.brand.toLowerCase().includes(value) ||
          product.title.toLowerCase().includes(value) ||
          product.description.toLowerCase().includes(value)
      );

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(formattedData);
    }
  };

  const handleLocalStorageData = async (key, product) => {
    let storageData = JSON.parse(localStorage.getItem(key)) || [];
    let updatedData;

    if (Array.isArray(storageData)) {
      if (storageData.some((item) => item._id === product._id)) {
        updatedData = storageData.filter((item) => item._id !== product._id);

        if (loggedUser && isClient(loggedUser) && key === "cart") {
          deleteProductInCart(product.serverId);
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

  useEffect(() => {
    formatData();
  }, [data]);

  return (
    <Container maxWidth="xl" className="dataContainer">
      <div className="searchBar">
        <input type="text" onChange={getSearchedData} />
        <img src={searchIcon} alt="Search" onClick={getSearchedData} />
      </div>
      <div className="dataContainerContent">
        {filteredProducts.length ? (
          filteredProducts.map(
            (product) =>
              product.stock > 0 && (
                <div className="card" key={product._id}>
                  <img src={product.images[0].url} alt={product.title} />
                  <div className="cardInfo">
                    <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                      {product.brand}
                    </p>
                    <p> {product.title} </p>
                    <p> {product.description} </p>
                    <p style={{ fontWeight: "500", marginTop: "5px" }}>
                      <span className={product.salePrice && "oldPrice"}>
                        {Number.isInteger(product.productPrice)
                          ? product.productPrice
                          : product.productPrice.toFixed(2)}
                        $
                      </span>
                      {product.salePrice > 0 && (
                        <span className="salePrice">
                          {Number.isInteger(product.salePrice)
                            ? product.salePrice
                            : product.salePrice.toFixed(2)}
                          $
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="interactions">
                    <img
                      src={
                        favoritesRed.some((el) => el._id === product._id)
                          ? inFavoritesIcon
                          : favoriteIcon
                      }
                      alt="Add to favorites"
                      onClick={() =>
                        handleLocalStorageData("favorites", product)
                      }
                    />
                    <img
                      src={
                        cartRed.some((el) => el._id === product._id)
                          ? inCartIcon
                          : cartIcon
                      }
                      alt="Add to card"
                      onClick={() => handleLocalStorageData("cart", product)}
                    />
                  </div>
                  <div className={product.isPublish ? "hidden" : "nonPublish"}>
                    <h2>
                      NOT <br /> ACTIVE
                    </h2>
                    <img
                      src={outOfCartIcon}
                      className="deleteNonPublishCard"
                      alt="Delete"
                      onClick={() => handleLocalStorageData("cart", product)}
                    />
                  </div>
                </div>
              )
          )
        ) : (
          <h1>No products found.</h1>
        )}
      </div>
    </Container>
  );
}

export default DataContainer;
