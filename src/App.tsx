import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";

import Auth from "./pages/auth";
import Users from "./pages/user";
import Dashboard from "./pages/dashboard";
import Loader from "./shared/components/atoms/Loader";
import { Toaster } from "react-hot-toast";
import UserFormModal from "./pages/user/components/UserFormModal";
import { UserProvider } from "./context/UserContext";

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

const App = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;

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
        },
        {
          path: "users/:id",
          element: <UserFormModal />,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserProvider>
  );
};

export default App;
