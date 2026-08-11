import { createBrowserRouter } from "react-router";

import Layout from "../components/Layout.jsx";
import Home from "../pages/home/Home.jsx";
import LoginPage from "../pages/login/LoginPage.jsx";
import RegisterPage from "../pages/register/RegisterPage.jsx";
import { getUserOrNull } from "../utils/getUserOrNull.js";
import { redirectIfLoggedIn } from "../utils/redirectIfLoggedIn.js";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    loader: getUserOrNull,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: LoginPage, loader: redirectIfLoggedIn },
      { path: "register", Component: RegisterPage, loader: redirectIfLoggedIn },
    ],
  },
]);

export default router;
