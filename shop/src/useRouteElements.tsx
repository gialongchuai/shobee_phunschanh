import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterLayout from "./layouts/Register";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import { AppContext } from "./contexts/app.context";
import { useContext } from "react";

function ProtectedRouter() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRouter() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: "",
      element: <RejectedRouter />,
      children: [
        {
          path: "/login",
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          ),
        },
        {
          path: "/register",
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRouter />,
      children: [
        {
          path: "/profile",
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
    },
  ]);

  return element;
}
