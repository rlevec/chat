import { createRoot } from "react-dom/client";

import "./index.css";

import Router from "./router";

import { AuthProvider } from "./provider/auth";
import { RouterProvider } from "./provider/router";

createRoot(document.getElementById("root")).render(
  <RouterProvider>
    <AuthProvider>
     <Router/>
    </AuthProvider>
  </RouterProvider>
  );
