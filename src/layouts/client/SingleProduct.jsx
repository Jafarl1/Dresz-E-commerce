import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth, useStorage } from "../../hooks/customHooks";
import { Container } from "/src/styles/mui";
import favoriteIcon from "../../assets/icons/favorite-icon.png";
import inFavoritesIcon from "../../assets/icons/in-favorites-icon.png";
import cartIcon from "../../assets/icons/cart-icon.png";
import inCartIcon from "../../assets/icons/in-cart-icon.png";

import { isClient } from "../../utils/utils";

function SingleProduct() {
  const favoritesRed = useSelector((state) => state.favorites);
  const cartRed = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  const { loggedUser } = useAuth();
  const { handleLocalStorageData } = useStorage();

  const handleImageClick = ({ target }) => {
    if (!document.fullscreenElement) {
      target.requestFullscreen().catch((error) => console.log(error));
    } else {
      document.exitFullscreen();
    }
  };

  const handleShopButton = async (e, product) => {
    if (!cartRed.some((item) => item._id === product._id)) {
      await handleLocalStorageData(e, "cart", product);
    }

    if (isClient(loggedUser)) {
      navigate("/layout/checkout");
    } else {
      navigate("/layout/signin", { state: { goToCheckout: true } });
    }
  };

  return (
    <Container maxWidth="xl" className="singleProductContainer">
      <div className="productImages">
        {product.images.map((image) => (
          <img
            src={image.url}
            key={image.url}
            className="productImage"
            alt="Product"
            onClick={handleImageClick}
          />
        ))}
      </div>
      <div className="productDetails">
        <h2> {product.brand} </h2>
        <h3> {product.title} </h3>
        <h4> {product.description} </h4>
        <div className="productPrice">
          <h5 className={product.salePrice > 0 ? "oldPrice" : ""}>
            {product.productPrice}$
          </h5>
          {product.salePrice > 0 && (
            <h5 className="newPrice"> {product.salePrice}$ </h5>
          )}
        </div>
        <div className="iconsContainer">
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
              cartRed.some((el) => el._id === product._id)
                ? inCartIcon
                : cartIcon
            }
            alt="Add to card"
            onClick={(e) => handleLocalStorageData(e, "cart", product)}
          />
        </div>
        <button
          className="shopNow"
          onClick={(e) => handleShopButton(e, product)}
        >
          SHOP NOW
        </button>
      </div>
    </Container>
  );
}

export default SingleProduct;
