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
import { authenticated } from "./contexts/Auth";
import AddBook from "./components/Admin/AddBook";
import DeleteBook from "./components/Admin/DeleteBook";

function Protect({
	protect = false,
	children,
	admin = false,
	name = "",
}: {
	children: ReactNode;
	protect?: boolean;
	admin?: boolean;
	name?: string;
}) {
	const authed = authenticated();
	if (authed === protect && admin)
		return <Dashboard name={name}>{children}</Dashboard>;
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
			<Suspense fallback="Loading">
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
							<Protect protect admin name="Add Book">
								{" "}
								<AddBook />
							</Protect>
						}
					/>
					<Route
						path="/dashboard/addbook"
						element={
							<Protect protect admin name="Add Book">
								<AddBook />
							</Protect>
						}
					/>
					<Route
						path="/dashboard/deletebook"
						element={
							<Protect protect admin name="Delete Book">
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
