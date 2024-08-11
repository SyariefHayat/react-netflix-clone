import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import Landing from "./pages/Landing";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/watch/:id",
    element: <Watch />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
