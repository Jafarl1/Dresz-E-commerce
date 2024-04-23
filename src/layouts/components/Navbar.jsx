import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartListRED } from "../../redux/client/cartSlice";
import useAuth from "../../hooks/useAuth";
import cartIcon from "../../assets/icons/cart-icon.png";
import favoriteIcon from "../../assets/icons/favorite-icon.png";
import userIcon from "../../assets/icons/user-icon.png";
import LogoIcon from "./LogoIcon";
import { mainSections, userSignPages, loggedUserPages } from "../../utils/db";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const favoritesRed = useSelector((state) => state.favorites);
  const cartRed = useSelector((state) => state.cart);
  const { loggedUser, setLoggedUser } = useAuth();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToClientsCabinet = () => {
    navigate("clients_cabinet");
    handleCloseUserMenu();
  };

  const signOutFromClientCabinet = () => {
    setLoggedUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("cart");
    dispatch(setCartListRED([]));
    if (pathname.includes("clients_cabinet")) {
      navigate("signin");
    }
    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          height: "30px",
          backgroundColor: "var(--main)",
          fontFamily: "cinzel",
          paddingTop: "5px",
          zIndex: 98,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <NavLink
            to="tel:+994777666600"
            style={{ fontSize: "14px", color: "var(--light)" }}
          >
            +994 77 766 66 00
          </NavLink>
          <NavLink
            to="mailto:zohrabjafarli@gmail.com"
            style={{ fontSize: "14px", color: "var(--light)" }}
          >
            zohrabjafarli@gmail.com
          </NavLink>
        </Container>
      </AppBar>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "var(--light)",
          fontFamily: "cinzel",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.4)",
          zIndex: 99,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
            <NavLink to="/" className="flex items-center">
              <LogoIcon width={30} className="navbar-logo-md" />
            </NavLink>

            <Box
              className="navbarLinks"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {mainSections.map((section) => (
                <NavLink
                  to={section.path}
                  key={section.path}
                  onClick={handleCloseNavMenu}
                  style={{
                    display: "block",
                    fontFamily: "cinzel",
                    color: "var(--dark)",
                  }}
                >
                  {section.name}
                </NavLink>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="small"
                onClick={handleOpenNavMenu}
                sx={{
                  color: "var(--light)",
                  backgroundColor: "var(--dark)",
                  "&:hover": { backgroundColor: "var(--dark)" },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {mainSections.map((section) => (
                  <NavLink
                    to={section.path}
                    key={section.path}
                    onClick={handleCloseNavMenu}
                    style={{
                      display: "block",
                      fontFamily: "cinzel",
                      color: "var(--dark)",
                      margin: "5px 10px",
                    }}
                  >
                    {section.name}
                  </NavLink>
                ))}
              </Menu>
            </Box>

            <NavLink to="/" className="flex justify-center items-center">
              <LogoIcon width={40} className="navbar-logo-sm" />
            </NavLink>

            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
              <IconButton
                className="navbarIconButton"
                size="small"
                onClick={() => navigate("cart")}
              >
                <Avatar
                  src={cartIcon}
                  alt="Cart"
                  sx={{
                    width: "34px",
                    height: "34px",
                    padding: "4px",
                  }}
                />
                {cartRed.length > 0 && (
                  <p className="count">{cartRed.length}</p>
                )}
              </IconButton>
              <IconButton
                className="navbarIconButton"
                size="small"
                onClick={() => navigate("favorites")}
              >
                <Avatar
                  src={favoriteIcon}
                  alt="Favorites"
                  sx={{
                    width: "34px",
                    height: "34px",
                    padding: "2px",
                  }}
                />
                {favoritesRed.length > 0 && (
                  <p className="count">{favoritesRed.length}</p>
                )}
              </IconButton>
              <IconButton size="small" onClick={handleOpenUserMenu}>
                <Avatar
                  src={userIcon}
                  alt="Account"
                  sx={{ width: "34px", height: "34px", padding: "4px" }}
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {loggedUser && loggedUser.role === "client"
                  ? loggedUserPages.map((page) => (
                      <span
                        key={page.name}
                        onClick={
                          page.action === "signout"
                            ? signOutFromClientCabinet
                            : goToClientsCabinet
                        }
                        style={{
                          display: "block",
                          fontFamily: "cinzel",
                          color: "var(--dark)",
                          margin: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        {page.name}
                      </span>
                    ))
                  : userSignPages.map((page) => (
                      <NavLink
                        to={page.path}
                        key={page.path}
                        onClick={handleCloseUserMenu}
                        style={{
                          display: "block",
                          fontFamily: "cinzel",
                          color: "var(--dark)",
                          margin: "5px 10px",
                        }}
                      >
                        {page.name}
                      </NavLink>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
