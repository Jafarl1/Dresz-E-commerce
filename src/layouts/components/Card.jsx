import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth, useStorage } from "../../hooks/customHooks";
// import { useAuth } from "../../hooks/useAuth";
// import { useStorage } from "../../hooks/useStorage";

import favoriteIcon from "../../assets/icons/favorite-icon.png";
import inFavoritesIcon from "../../assets/icons/in-favorites-icon.png";
import cartIcon from "../../assets/icons/cart-icon.png";
import inCartIcon from "../../assets/icons/in-cart-icon.png";
import outOfCartIcon from "../../assets/icons/out-of-cart-icon.png";

function Card({ product }) {
  const favoritesRed = useSelector((state) => state.favorites);
  const cartRed = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { loggedUser } = useAuth();

  const { handleLocalStorageData } = useStorage();

  const navigateToProductPage = (product) => {
    navigate(`/layout/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="card bg-white" onClick={() => navigateToProductPage(product)}>
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
          onClick={(e) => handleLocalStorageData(e, "favorites", product)}
        />
        <img
          src={
            cartRed.some((el) => el._id === product._id) ? inCartIcon : cartIcon
          }
          alt="Add to card"
          onClick={(e) => handleLocalStorageData(e, "cart", product)}
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
          onClick={(e) => handleLocalStorageData(e, "cart", product)}
        />
      </div>
    </div>
  );
}

export default Card;
