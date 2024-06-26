import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAdminsListRED } from "../../redux/admin/adminsSlice";
import { getBrandsListRED } from "../../redux/common/brandsSlice";
import { getProductsListRED } from "../../redux/common/productsSlice";
import { getAdmins } from "../../services/dashboard/admins";
import { getBrands } from "../../services/dashboard/brands";
import { getProducts } from "../../services/dashboard/products";

import { useAuth, useTheme } from "../../hooks/customHooks";
import SwitchTheme from "../components/SwitchTheme";
import { mainListItems, ExitButton } from "./ListItems";
import Loader from "./../components/Loader";
import Dashboard from "./dashboard/Dashboard";
import { isAdminOrSuperadmin, isSuperadmin } from "../../utils/utils";

import { styled } from "@mui/material/styles";

// import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";

import {
  Box,
  CssBaseline,
  MuiDrawer,
  MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  MenuIcon,
  ChevronLeftIcon,
} from "/src/styles/mui";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "var(--main)",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function AdminsCabinet() {
  const [open, setOpen] = useState(true);

  const { loggedUser } = useAuth();
  const { ifDark } = useTheme();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const loadingRed = useSelector((state) => state.loading);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getAdminsCabinetsData = async (boolean) => {
      try {
        let adminsData;
        let brandsData;
        let productsData;

        if (boolean) {
          const [adminsResponse, brandsResponse, productsResponse] =
            await Promise.all([getAdmins(), getBrands(), getProducts()]);

          adminsData = adminsResponse.data.data;
          brandsData = brandsResponse.data.data;
          productsData = productsResponse.data.data.product;
        } else {
          const [brandsResponse, productsResponse] = await Promise.all([
            getBrands(),
            getProducts(),
          ]);

          brandsData = brandsResponse.data.data;
          productsData = productsResponse.data.data.product;
        }

        if (boolean) {
          if (adminsData) {
            dispatch(getAdminsListRED(adminsData));
          } else {
            console.error(
              "Error fetching admins data (admin):",
              adminsResponse.reason
            );
          }
        }

        if (brandsData) {
          dispatch(getBrandsListRED(brandsData));
        } else {
          console.error(
            "Error fetching brands data (admin):",
            brandsResponse.reason
          );
        }

        if (productsData) {
          dispatch(getProductsListRED(productsData));
        } else {
          console.error(
            "Error fetching products data (admin):",
            productsResponse.reason
          );
        }
      } catch (error) {
        console.error("Error in getAdminsCabinetsData:", error);
      }
    };

    getAdminsCabinetsData(isSuperadmin(loggedUser));
  }, []);

  if (loadingRed || loggedUser === undefined) {
    return <Loader />;
  } else {
    if (loggedUser && isAdminOrSuperadmin(loggedUser) && !loadingRed)
      return (
        <div className={`adminsCabinet ${ifDark("bg-zinc-800")}`}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "24px",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Dashboard
                </Typography>

                <SwitchTheme />
              </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open} sx={{}}>
              <Toolbar
                className={`${ifDark("border border-zinc-800 bg-zinc-800 ")}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List
                className={`${ifDark("border border-zinc-800 bg-zinc-800 ")}`}
              >
                {mainListItems()}
                <Divider sx={{ my: 1 }} />
                <ExitButton />
              </List>
            </Drawer>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                mt: "64px",
              }}
            >
              <h2
                className={`w-full flex justify-center items-center pb-2 my-4 text-xl border-b border-zinc-200 
                ${ifDark("text-amber-50")}`}
              >
                Hello, {loggedUser.name} {loggedUser.surname} !
              </h2>
              {pathname.replaceAll("/", "") === "adminadmins_cabinet" ? (
                <Dashboard />
              ) : (
                <Outlet />
              )}
            </Box>
          </Box>
        </div>
      );
    if (loggedUser === null)
      return <Navigate to="/admin/admins_signin" replace={true} />;
  }
}

export default AdminsCabinet;
