import { createBrowserRouter } from "react-router";

import { getUserOrNull } from "../features/auth/utils/getUserOrNull.js";
import { redirectIfLoggedIn } from "../features/auth/utils/redirectIfLoggedIn.js";
import { requireAuth } from "../features/auth/utils/requireAuth.js";

import Layout from "../components/Layout.jsx";
import Home from "../pages/home/Home.jsx";
import LoginPage from "../pages/login/LoginPage.jsx";
import RegisterPage from "../pages/register/RegisterPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import PostDetailPage from "../pages/posts/PostDetailPage.jsx";
import CreatePostPage from "../pages/dashboard/CreatePostPage.jsx";
import EditPostPage from "../pages/dashboard/EditPostPage.jsx";

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
      { path: "posts/:id", Component: PostDetailPage },
      {
        path: "dashboard",
        id: "dashboard",
        loader: requireAuth,
        children: [
          { index: true, Component: DashboardPage },
          {
            path: "posts/new",
            Component: CreatePostPage,
          },
          {
            path: "posts/:id/edit",
            Component: EditPostPage,
          },
        ],
      },
    ],
  },
]);

export default router;
