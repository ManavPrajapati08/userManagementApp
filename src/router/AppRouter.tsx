import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import type { ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";

import Auth from "../pages/auth";
import Users from "../pages/user";
import Dashboard from "../pages/dashboard";
import UserFormModal from "../pages/user/components/UserFormModal";

interface RouteProps {
  user: FirebaseUser | null;
  children: ReactNode;
}

const ProtectedRoute = ({ user, children }: RouteProps) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const PublicRoute = ({ user, children }: RouteProps) => {
  if (user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export const AppRouter = ({ user }: { user: FirebaseUser | null }) => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <PublicRoute user={user}>
          <Auth />
        </PublicRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <Users />,
          children: [
            {
              path: ":id",
              element: <UserFormModal />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
