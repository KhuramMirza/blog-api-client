/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Loader2 } from "lucide-react";

import { getUserOrNull } from "../features/auth/utils/getUserOrNull.js";
import { redirectIfLoggedIn } from "../features/auth/utils/redirectIfLoggedIn.js";
import { requireAuth } from "../features/auth/utils/requireAuth.js";
import Layout from "../components/Layout.jsx";

const Home = lazy(() => import("../pages/home/Home.jsx"));
const LoginPage = lazy(() => import("../pages/login/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/register/RegisterPage.jsx"));
const DashboardPage = lazy(
  () => import("../pages/dashboard/DashboardPage.jsx"),
);
const PostDetailPage = lazy(() => import("../pages/posts/PostDetailPage.jsx"));
const CreatePostPage = lazy(
  () => import("../pages/dashboard/CreatePostPage.jsx"),
);
const EditPostPage = lazy(() => import("../pages/dashboard/EditPostPage.jsx"));

const SuspenseWrapper = ({ children }) => (
  <Suspense
    fallback={
      // Centers the loader on the screen with Tailwind CSS
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    }
  >
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    loader: getUserOrNull,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
        loader: redirectIfLoggedIn,
      },
      {
        path: "register",
        element: (
          <SuspenseWrapper>
            <RegisterPage />
          </SuspenseWrapper>
        ),
        loader: redirectIfLoggedIn,
      },
      {
        path: "posts/:id",
        element: (
          <SuspenseWrapper>
            <PostDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "dashboard",
        id: "dashboard",
        loader: requireAuth,
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper>
                <DashboardPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: "posts/new",
            element: (
              <SuspenseWrapper>
                <CreatePostPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: "posts/:id/edit",
            element: (
              <SuspenseWrapper>
                <EditPostPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
