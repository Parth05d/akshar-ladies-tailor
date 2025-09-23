import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Measurement from "./pages/Measurement";
import About from "./pages/About";
import Profile from "./pages/Profile";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import MeasurementForm from "./pages/MeasurementForm";
import MeasurementDetail from "./pages/MeasurementDetail";
import EditMeasurement from "./pages/EditMeasurement";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout setUser={setUser} user={user} />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <ProtectedRoute />,
        },
        {
          path: "/measure",
          element: <Measurement />,
        },
        {
          path: "/measure/:id",
          element: <MeasurementDetail />,
        },
        {
          path: "/measure/edit/:id",
          element: <EditMeasurement />,
        },
        {
          path: "/add-measure",
          element: <MeasurementForm />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/login",
          element: <Login user={user} setUser={setUser} />,
        },
        {
          path: "/register",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
