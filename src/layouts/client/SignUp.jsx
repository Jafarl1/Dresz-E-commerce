import { Navigate } from "react-router-dom";
import { registerClient } from "../../services/website/clients";
import useAuth from "../../hooks/useAuth";
import { isClient } from "../../utils/utils";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingRED } from "../../redux/loading/loadingSlice";

function SignUp() {
  const { loggedUser } = useAuth();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoadingRED(true));

    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get("firstName"),
      surname: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await registerClient(userData);
      const { user } = response.data.data;

      Swal.fire({
        icon: "success",
        title:
          user.name && user.surname
            ? `Welcome, ${user.name} ${user.surname}!`
            : "Welcome!",
        text: "You have successfully registered!",
        footer: '<a href="/layout/signin"> Sign in </a>',
      });
    } catch (error) {
      console.error("User sign up error: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message
          ? `${error.response.data.message}.`
          : "Unknown error.",
      });
    } finally {
      dispatch(setLoadingRED(false));
    }
  };

  return loading ? (
    <Loader />
  ) : loggedUser && isClient(loggedUser) ? (
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
            Sign up
          </Typography>

          <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="signFormInput"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="signFormInput"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="signFormInput"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="signFormInput"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="customButton"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="signin"
                  variant="body2"
                  sx={{ color: "var(--dark)", textDecoration: "none" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default SignUp;
