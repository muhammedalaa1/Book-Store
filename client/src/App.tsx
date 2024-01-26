import { type ReactNode, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
const Login = lazy(() => import("./components/Login/Login"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const Home = lazy(() => import("./components/Home"));
const Nav = lazy(() => import("./components/NavBar/Nav"));
const Book = lazy(() => import("./components/Book/Book"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
import { authenticated } from "./contexts/Auth";

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
