import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { isSuperadmin } from "../../utils/utils";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

export const mainListItems = () => {
  const { loggedUser } = useAuth();

  return (
    <>
      <Link to="./">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      {isSuperadmin(loggedUser) && (
        <Link to="admins">
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Admins" />
          </ListItemButton>
        </Link>
      )}

      <Link to="products">
        <ListItemButton>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </Link>

      <Link to="payments">
        <ListItemButton>
          <ListItemIcon>
            <PaymentsIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItemButton>
      </Link>

      <Link to="statistics">
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItemButton>
      </Link>
    </>
  );
};

export function ExitButton() {
  const { setLoggedUser } = useAuth();

  const exitFromCabinet = () => {
    setLoggedUser(null);
    localStorage.removeItem("access_token");
  };

  return (
    <>
      <ListItemButton onClick={exitFromCabinet}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Exit" />
      </ListItemButton>
    </>
  );
}
