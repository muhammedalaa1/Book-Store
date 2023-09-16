import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "./login.scss";
import useDebouncedCallback from "../../hooks/useDebounce";
import "react-toastify/dist/ReactToastify.css";
import { SyncLoader } from "react-spinners";

const Inputs = ({
	handleInputChange,
	value,
	title,
	type,
}: {
	type: string;
	title: string;
	value: string;
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<>
			<label htmlFor={type} className="mt-8 text-start mb-2 font-semibold">
				{title}
			</label>
			<input
				type={type}
				name={type}
				className="border border-black w-full p-2 rounded"
				onChange={handleInputChange}
				value={value}
				required
			/>
		</>
	);
};

const Login: React.FC = () => {
	const [loginData, setloginData] = useState({ email: "", password: "" });
	const { login } = useAuth();
	const [loading, setloading] = useState(false);

	const debounceLogin = useDebouncedCallback(async () => {
		setloading((prev) => true);

		await login(loginData.email, loginData.password);
		setloading((prev) => false);
	});
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		debounceLogin();
	};
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setloginData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<>
			<div className="container h-screen ">
				<div className="h-screen flex gap-4 md:gap-8 justify-center items-center text-center">
					<img
						src="../../../public/undraw_mobile_login_re_9ntv (2).svg"
						alt="Login_img"
						className="w-96 h-auto hidden md:flex"
					/>
					<form
						className=" flex flex-col bg-gray-200 p-12 lg:w-6/12 rounded-xl shadow-lg"
						onSubmit={handleSubmit}
					>
						<h2 className="font-semibold text-2xl">Please Log in</h2>
						<Inputs
							handleInputChange={handleInputChange}
							value={loginData.email}
							type="email"
							title="Email"
						/>

						<Inputs
							handleInputChange={handleInputChange}
							value={loginData.password}
							type="password"
							title="Password"
						/>
						<div className="w-full text-center justify-center flex-col items-center">
							<button
								type="submit"
								className="bg-black text-white rounded-3xl  duration-700   transition-colors p-2 lg:w-1/2 w-full mt-4  "
							>
								<SyncLoader
									color="#7151ed"
									loading={loading}
									size={7}
									speedMultiplier={0.7}
								/>
								<span
									className={`relative z-[1000] ${
										loading ? "hidden" : "inline"
									}`}
								>
									{" "}
									Login
								</span>
							</button>
							<h4 className="  text-[#1877f2] font-semibold">
								Don't have account ? <Link to={"/signup"}>Sign up </Link>
							</h4>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
//before:absolute before:bg-violet-600 before:right-0 before:top-0 before:h-full before:w-full before:z-50 relative
export default Login;
