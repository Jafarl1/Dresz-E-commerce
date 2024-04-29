import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoadingRED } from "./redux/loading/loadingSlice";
import { getBrandsListRED } from "./redux/common/brandsSlice";
import { getProductsListRED } from "./redux/common/productsSlice";
import { setFavoritesListRED } from "./redux/client/favoritesSlice";
import { setCartListRED } from "./redux/client/cartSlice";
import { getAllBrands } from "./services/website/brands";
import { getAllProducts } from "./services/website/products";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCommonData = async () => {
      try {
        dispatch(setLoadingRED(true));

        const [brandsResponse, productsResponse] = await Promise.all([
          getAllBrands(),
          getAllProducts(),
        ]);

        const brandsData = brandsResponse.data.data;
        const productsData = productsResponse.data.data.product;

        if (brandsData) {
          dispatch(getBrandsListRED(brandsData));
        } else {
          console.error(
            "Error fetching brands data (client):",
            brandsResponse.reason
          );
        }

        if (productsData) {
          dispatch(getProductsListRED(productsData));
        } else {
          console.error(
            "Error fetching products data (client):",
            productsResponse.reason
          );
        }

        dispatch(setLoadingRED(false));
      } catch (error) {
        console.error("Error in getCommonData:", error);
      }
    };

    dispatch(
      setFavoritesListRED(JSON.parse(localStorage.getItem("favorites")) || [])
    );
    dispatch(setCartListRED(JSON.parse(localStorage.getItem("cart")) || []));

    getCommonData();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
