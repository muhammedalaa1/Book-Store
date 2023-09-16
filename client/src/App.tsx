import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home";
import { authenticated } from "./contexts/Auth";
import Nav from "./components/NavBar/Nav";

function Protect({
	protect = false,
	children,
}: {
	children: ReactNode;
	protect?: boolean;
}) {
	const authed = authenticated();

	if (authed === protect) return children;
	return <Navigate to={protect ? "/login" : "/"} />;
}

function App() {
	return (
		<>
			{" "}
			<Nav />
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
			</Routes>
		</>
	);
}

export default App;
