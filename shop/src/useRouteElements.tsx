import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterLayout from "./layouts/Register";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
    },
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
    {
      path: "/productlist",
      element: <ProductList />,
    },
  ]);

  return element;
}
