import { useState, type ReactNode, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home";
import { authenticated } from "./contexts/Auth";
import Nav from "./components/NavBar/Nav";
import Book from "./components/Book/Book";
import Cart from "./components/Cart/Cart";

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
	const [boxShadows, setBoxShadows] = useState<Record<string, string>>({});
	const [boxShadows1, setBoxShadows1] = useState<Record<string, string>>({});
	const [font, setFont] = useState<Record<string, string>>({});

	const rgbaToCSS = (pixelData: number[], bookId: number): string => {
		const currentFontValue =
			pixelData[0] > 100 && pixelData[1] > 100 ? "0" : "1";

		if (font[bookId] !== currentFontValue) {
			setFont((prev) => ({
				...prev,
				[bookId]: currentFontValue,
			}));
		}

		return `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${
			pixelData[3] / 255
		})`;
	};

	const [processedBooks, setProcessedBooks] = useState<Set<string>>(new Set());

	const handlePixelExtracted = useCallback(
		(pixelData: number[], bookId: any) => {
			if (processedBooks.has(bookId)) return;

			const cssColor = rgbaToCSS(pixelData, bookId);
			let boxShadowValue = `0px 5px 15px -5px ${cssColor}`;

			if (boxShadows[bookId] !== cssColor) {
				setBoxShadows((prevShadows) => ({
					...prevShadows,
					[bookId]: cssColor,
				}));
				setBoxShadows1((prevShadows) => ({
					...prevShadows,
					[bookId]: boxShadowValue,
				}));
			}
			setProcessedBooks((prev) => new Set(prev).add(bookId));
		},
		[boxShadows, processedBooks]
	);
	return (
		<>
			{" "}
			<Nav />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							boxShadows={boxShadows}
							font={font}
							boxShadows1={boxShadows1}
							handlePixelExtracted={handlePixelExtracted}
						/>
					}
				/>
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
					path="/Book/:id"
					element={
						<Book
							boxShadows={boxShadows}
							font={font}
							boxShadows1={boxShadows1}
							handlePixelExtracted={handlePixelExtracted}
						/>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
