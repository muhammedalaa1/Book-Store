import "./App.css";
import Home from "./components/Home";
import Nav from "./components/NavBar/Nav";
import { Routes, Route } from "react-router-dom";
import Test from "./components/Test";
function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Dashboard" element={<Test />} />
			</Routes>
		</>
	);
}

export default App;
