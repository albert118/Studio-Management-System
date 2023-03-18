import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Project from "./pages/Project/Project";
import Group from "./pages/Group/Group";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/project",
    element: (
      <Layout>
        <Project />
      </Layout>
    ),
  },
  {
    path: "/group",
    element: (
      <Layout>
        <Group />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
