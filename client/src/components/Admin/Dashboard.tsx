import { useAuth } from "../../contexts/Auth";
import "./dashboard.scss";
const Dashboard = () => {
	const { user } = useAuth();
	return (
		<>
			<div className="flex">
				<aside className="w-1/3 bg-gray-50 h-screen">
					<div className="m-2">
						<p data-letters={`${user?.userName.charAt(0)}`}>
							{user?.userName.charAt(0).toUpperCase()}
							{user?.userName.slice(1)}
						</p>
					</div>
				</aside>
				<div>fadjgkhdkl</div>
			</div>
		</>
	);
};

export default Dashboard;
