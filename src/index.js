import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "assets/css/input.css";
import 'assets/css/main.css'
import AppRoute from "./routes/AppRoute.route";
import { AuthProvider } from "Context/AuthContext/AuthContext.auth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <AppRoute />
  </AuthProvider>
);

reportWebVitals();
