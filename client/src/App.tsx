import { type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home";
import { authenticated } from "./contexts/Auth";
import Nav from "./components/NavBar/Nav";
import Book from "./components/Book/Book";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Admin/Dashboard";

function Protect({
	protect = false,
	children,
	admin = false,
}: {
	children: ReactNode;
	protect?: boolean;
	admin?: boolean;
}) {
	const authed = authenticated();
	if (authed === protect && admin) return <Dashboard />;
	if (authed === protect) return children;
	return <Navigate to={protect ? "/login" : "/"} />;
}

function App() {
	const location = useLocation();
	const dashboard = location.pathname.startsWith("/dashboard");
	return (
		<>
			{" "}
			{!dashboard && <Nav />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/login"
					element={
						<Protect>
							<Login />
						</Protect>
					}
				/>
				<Route
					path="/signup"
					element={
						<Protect>
							{" "}
							<Signup />
						</Protect>
					}
				/>
				<Route
					path="/cart"
					element={
						<Protect protect>
							{" "}
							<Cart />
						</Protect>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<Protect protect admin>
							{" "}
							<Dashboard />
						</Protect>
					}
				/>
				<Route path="/Book/:id" element={<Book />} />
			</Routes>
			{!dashboard && <Footer />}
		</>
	);
}

export default App;
