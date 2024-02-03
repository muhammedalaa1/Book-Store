import { type ReactNode, lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
const Login = lazy(() => import("./components/Login/Login"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const Home = lazy(() => import("./components/Home"));
const Nav = lazy(() => import("./components/NavBar/Nav"));
const Book = lazy(() => import("./components/Book/Book"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Dashboard = lazy(() => import("./components/Admin/layout/Dashboard"));
import { authenticated, useAuth } from "./contexts/Auth";
import AddBook from "./components/Admin/AddBook";
import DeleteBook from "./components/Admin/DeleteBook";

function Protect({
	protect = false,
	children,
	name = "",
	role = "user",
}: {
	children: ReactNode;
	protect?: boolean;
	name?: string;
	role?: string;
}) {
	const authed = authenticated();
	console.log(authed);
	if (authed === protect && role === "admin")
		return <Dashboard name={name}>{children}</Dashboard>;
	if (
		authed === protect &&
		role === "user" &&
		authed !== true &&
		name !== "login"
	)
		return <Navigate to={"/"} />;
	if (authed === protect) return children;
	return <Navigate to={protect ? "/login" : "/"} />;
}

function App() {
	const location = useLocation();
	const allowed = useAuth().user;
	const dashboard = location.pathname.startsWith("/dashboard");

	return (
		<>
			{" "}
			{!dashboard && <Nav />}
			<Suspense fallback="Loading">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<Protect name="login">
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
							<Protect protect name="Add Book" role={allowed?.role}>
								{" "}
								<AddBook />
							</Protect>
						}
					/>
					<Route
						path="/dashboard/addbook"
						element={
							<Protect protect name="Add Book" role={allowed?.role}>
								<AddBook />
							</Protect>
						}
					/>
					<Route
						path="/dashboard/deletebook"
						element={
							<Protect protect name="Delete Book" role={allowed?.role}>
								<DeleteBook />
							</Protect>
						}
					/>
					<Route path="/Book/:id" element={<Book />} />
				</Routes>
			</Suspense>
			{!dashboard && <Footer />}
		</>
	);
}

export default App;
