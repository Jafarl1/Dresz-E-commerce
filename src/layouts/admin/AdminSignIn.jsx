import { useDispatch, useSelector } from "react-redux";
import { setLoadingRED } from "../../redux/loading/loadingSlice";
import useAuth from "../../hooks/useAuth";
import { signInRequest } from "../../services/auth";
import { isAdminOrSuperadmin, isClient } from "../../utils/utils";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Loader from "../components/Loader";

function AdminSignIn() {
  const { loggedUser, setLoggedUser } = useAuth();
  const loadingRed = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoadingRED(true));

    const data = new FormData(event.currentTarget);
    const adminData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const data = await signInRequest(adminData);
      const { token, user } = data.data.data;

      if (isAdminOrSuperadmin(user)) {
        localStorage.setItem("access_token", token);
        setLoggedUser(user);
      } else {
        alert("Wrong credentials. Please try again.");
        dispatch(setLoadingRED(false));
      }
    } catch (error) {
      alert("Wrong credentials. Please try again.");
      console.log(error.response.data.message);
      dispatch(setLoadingRED(false));
    }
  };

  if (loadingRed || loggedUser === undefined) {
    return <Loader />;
  }

  if (loggedUser === null || isClient(loggedUser)) {
    return (
      <div className="signPage" style={{ height: "100vh" }}>
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
              Admin
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
            </form>
          </Box>
        </Container>
      </div>
    );
  }
}

export default AdminSignIn;
