import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import Users from "./pages/User";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

// 🔐 Protected Route
const ProtectedRoute = ({ user, children }: any) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const PublicRoute = ({ user, children }: any) => {
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
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
          <Layout />
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
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
