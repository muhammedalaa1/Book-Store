import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import useDebouncedCallback from "../../hooks/useDebounce";
const Inputs = ({
	handleInputChange,
	value,
	title,
	type,
	name,
}: {
	type: string;
	title: string;
	value: string;
	name?: string;
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<>
			<label htmlFor={type} className="mt-8 text-start mb-2 font-semibold">
				{title}
			</label>
			<input
				type={type}
				name={name ? name : type}
				className="border border-black w-full p-2 rounded"
				onChange={handleInputChange}
				value={value}
				required
			/>
		</>
	);
};

const Signup = () => {
	const [signUpData, setsignUpData] = useState({
		userName: "",
		password: "",
		email: "",
		phone: "",
	});
	const { signUp } = useAuth();

	const debounceSignup = useDebouncedCallback(() => {
		signUp(
			signUpData.userName,
			signUpData.email,
			signUpData.password,
			signUpData.phone
		)
			.then(() => {
				setsignUpData({ userName: "", password: "", email: "", phone: "" });
			})
			.catch((error: any) => console.log(error));
	});

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		debounceSignup();
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setsignUpData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	return (
		<>
			<div className="container h-screen ">
				<div className="h-screen flex   gap-4 md:gap-8 justify-center items-center text-center">
					<img
						src="../../.././undraw_sign_up_n6im.svg"
						alt="Login_img"
						className="w-96 h-auto hidden md:flex"
					/>
					<form
						action="submit"
						className=" flex flex-col bg-gray-200 p-12 lg:w-6/12 rounded-xl shadow-lg"
						onSubmit={handleSubmit}
					>
						<h2 className="font-semibold text-2xl">Please Sign Up</h2>
						<Inputs
							handleInputChange={handleInputChange}
							value={signUpData.userName}
							type="userName"
							title="User name"
						/>
						<Inputs
							handleInputChange={handleInputChange}
							value={signUpData.email}
							type="email"
							title="Email"
						/>

						<Inputs
							handleInputChange={handleInputChange}
							value={signUpData.password}
							type="password"
							title="Password"
						/>
						<Inputs
							handleInputChange={handleInputChange}
							value={signUpData.phone}
							type="tel"
							name="phone"
							title="Phone"
						/>
						<div className="w-full text-center justify-center flex-col items-center">
							<button
								type="submit"
								className="bg-black text-white rounded-3xl hover:bg-violet-500 duration-500  transition-colors p-2 lg:w-1/2 w-full mt-4  "
							>
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;
