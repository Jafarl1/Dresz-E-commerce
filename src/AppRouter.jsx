import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./layouts/Header";

import ClientLayout from "./layouts/client/ClientLayout";
import Home from "./layouts/client/Home";
import AboutPage from "./layouts/client/AboutPage";
import Sale from "./layouts/client/Sale";
import Contacts from "./layouts/client/Contacts";
import Cart from "./layouts/client/Cart";
import Favorites from "./layouts/client/Favorites";
import SignIn from "./layouts/client/SignIn";
import SignUp from "./layouts/client/SignUp";
import ClientsCabinet from "./layouts/client/cabinet/ClientsCabinet";

import AdminLayout from "./layouts/admin/AdminLayout";
import AdminSignIn from "./layouts/admin/AdminSignIn";
import AdminsCabinet from "./layouts/admin/AdminsCabinet";
import Dashboard from "./layouts/admin/dashboard/Dashboard";
import Products from "./layouts/admin/products/Products";
import Admins from "./layouts/admin/admins/Admins";
import SingleProduct from "./layouts/client/SingleProduct";
import Checkout from "./layouts/client/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "/layout",
    element: <ClientLayout />,
    children: [
      {
        path: "./",
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "sale",
        element: <Sale />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "clients_cabinet",
        element: <ClientsCabinet />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "admins_signin",
        element: <AdminSignIn />,
      },
      {
        path: "admins_cabinet",
        element: <AdminsCabinet />,
        children: [
          {
            path: "./",
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "admins",
            element: <Admins />,
          },
        ],
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
