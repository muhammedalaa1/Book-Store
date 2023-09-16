import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth.tsx";
import "./index.css";
import { ToastContainer, Slide } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App />
				<ToastContainer transition={Slide} />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
