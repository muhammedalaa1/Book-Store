import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

const Home: React.FC = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<>
			home
			<button onClick={handleLogout} className="block">
				log out
			</button>
		</>
	);
};

export default Home;
