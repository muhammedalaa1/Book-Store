import { type ReactNode, lazy, Suspense } from "react";
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
						<Suspense fallback="Loading">
							<Protect>
								<Login />
							</Protect>
						</Suspense>
					}
				/>
				<Route
					path="/signup"
					element={
						<Suspense fallback="Loading">
							<Protect>
								{" "}
								<Signup />
							</Protect>
						</Suspense>
					}
				/>
				<Route
					path="/cart"
					element={
						<Suspense fallback="Loading">
							<Protect protect>
								{" "}
								<Cart />
							</Protect>
						</Suspense>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<Suspense fallback="Loading">
							<Protect protect admin>
								{" "}
								<Dashboard />
							</Protect>
						</Suspense>
					}
				/>
				<Route
					path="/Book/:id"
					element={
						<Suspense fallback="Loading">
							<Book />{" "}
						</Suspense>
					}
				/>
			</Routes>
			{!dashboard && <Footer />}
		</>
	);
}

export default App;
