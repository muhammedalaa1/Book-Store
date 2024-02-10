import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth.tsx";
import "./index.css";
import { ToastContainer, Slide } from "react-toastify";
import React, { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={"...loading"}>
          <App />
          <ToastContainer transition={Slide} />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
