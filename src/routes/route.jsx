import { createBrowserRouter } from "react-router";

import { getUserOrNull } from "../utils/getUserOrNull.js";
import { redirectIfLoggedIn } from "../utils/redirectIfLoggedIn.js";
import { requireAuth } from "../utils/requireAuth.js";

import Layout from "../components/Layout.jsx";
import Home from "../pages/home/Home.jsx";
import LoginPage from "../pages/login/LoginPage.jsx";
import RegisterPage from "../pages/register/RegisterPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";

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
      { path: "dashboard", Component: DashboardPage, loader: requireAuth },
    ],
  },
]);

export default router;
