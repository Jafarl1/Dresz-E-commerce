import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingRED } from "../../redux/loading/loadingSlice";
import { setCartListRED } from "../../redux/client/cartSlice";
import { getCartData, postCartData } from "../../services/website/basket";
import { signInRequest } from "../../services/auth";
import { useAuth, useTheme } from "../../hooks/customHooks";
import { formatData, isClient } from "../../utils/utils";
import Loader from "../components/Loader";
import { getSingleProduct } from "../../services/website/products";
import Swal from "sweetalert2";

// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  LockOutlinedIcon,
  Typography,
  Container,
} from "/src/styles/mui";

function SignIn() {
  const { loggedUser, setLoggedUser } = useAuth();
  const { dark, changeTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const brands = useSelector((state) => state.brands);
  const loadingRed = useSelector((state) => state.loading);
  const cartRed = useSelector((state) => state.cart);
  localStorage.setItem("cart", JSON.stringify(cartRed));

  const formattedCartData = (product) => {
    return {
      productId: product._id,
      productCount: 1,
    };
  };

  const postCartDataToServer = async () => {
    const cartDataResponse = await getCartData();
    const cartData = cartDataResponse.data.data;

    const existingProductIds = cartData.map((product) => product.productId);

    const postData = {
      basket: cartRed
        .filter((product) => !existingProductIds.includes(product._id))
        .map((product) => formattedCartData(product)),
    };

    await postCartData(postData);

    const newCartDataResponse = await getCartData();
    const newCartData = newCartDataResponse.data.data;

    const promises = newCartData.map((product) =>
      getSingleProduct(product.productId)
    );

    const responses = await Promise.all(promises);

    let allProducts = responses
      .map((response) => response.data.data)
      .filter((product) => product)
      .map((product) => ({
        ...product,
        productCount: newCartData.find((el) => el.productId === product._id)
          ?.productCount,
        serverId:
          newCartData.find((el) => el.productId === product._id)?._id || null,
      }));

    allProducts = formatData({ brands, products: allProducts });

    // localStorage.setItem("cart", JSON.stringify(allProducts));
    dispatch(setCartListRED(allProducts));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoadingRED(true));

    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const signInResponse = await signInRequest(userData);
      const { user, token } = signInResponse.data.data;

      if (isClient(user)) {
        localStorage.setItem("access_token", token);
        await postCartDataToServer();
        setLoggedUser(user);
        if (location.state && location.state.goToCheckout) {
          navigate("/layout/checkout");
        } else {
          navigate("/layout/clients_cabinet");
        }
      } else {
        alert("Wrong credentials. Please try again.");
        dispatch(setLoadingRED(false));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message
          ? `${error.response.data.message}.`
          : "Unknown error.",
      });
      dispatch(setLoadingRED(false));
    }
  };

  return loadingRed ? (
    <Loader />
  ) : loggedUser && loggedUser.role === "client" ? (
    <Navigate to="/layout/clients_cabinet" replace={true} />
  ) : (
    <div className="signPage">
      <div className="overlay"></div>
      <Container
        component="main"
        maxWidth="xs"
        style={{ position: "absolute", zIndex: 3 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "var(--main)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="customButton"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href=""
                  variant="body2"
                  sx={{ color: "var(--dark)", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="signup"
                  variant="body2"
                  sx={{ color: "var(--dark)", textDecoration: "none" }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default SignIn;
