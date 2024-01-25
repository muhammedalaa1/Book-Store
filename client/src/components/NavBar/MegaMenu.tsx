import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "./navbar.scss";
import { useState } from "react";
window;
const MegaMenu = () => {
	const [Buttons, setButtons] = useState<any>({
		btn1: false,
		btn2: false,
		btn3: false,
	});
	const handleMenu = (name: string) => {
		setButtons((prev: any) => ({
			...prev,
			[name]: !prev[name],
		}));
	};

	return (
		<div className="md:hidden block mt-6 text-[#7151ed] font-semibold  text-lg overflow-hidden w-full">
			<nav className="custom-container ">
				<ul className="md:flex md:border-none items-center md:ml-12 gap-24 block border-t-4 py-12 border-t-[#7151ed]">
					<Link to={"/"}>
						<li className="mb-4 md:mb-0">Home</li>
					</Link>

					<div className="relative mb-4 md:mb-0">
						<Link to={"/"} className="md:p-4 p-0">
							About
							<div
								onClick={() => handleMenu("btn1")}
								className=" block md:inline md:static md:bg-transparent md:text-[#7151ed] bg-[#7151ed] text-white rounded-md text-center  absolute cursor-pointer right-0 top-0 w-[30px] text-2xl"
							>
								{" "}
								<KeyboardArrowDownIcon />
							</div>
						</Link>
						<div className={` ${Buttons.btn1 ? "active" : "test"}`}>
							<ul className="pl-8 mt-4">
								<li className="text-[#52545a]  relative">
									<span className="font-bold ">Featured</span>{" "}
									<div
										onClick={() => handleMenu("btn2")}
										className=" block md:inline md:static md:bg-transparent md:text-[#7151ed] bg-[#7151ed] text-white rounded-md text-center  absolute cursor-pointer right-0 top-0 w-[30px] text-2xl"
									>
										{" "}
										<KeyboardArrowDownIcon />
									</div>
									<ul
										className={`pl-8 text-[#52545a] flex flex-col gap-2 mt-2 ${
											Buttons.btn2 ? "active" : "test"
										}`}
									>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Trending</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Newest Books</li>
										</Link>
									</ul>
								</li>
								<li className="text-[#52545a] mt-4 relative">
									<span className="font-bold">Categories</span>{" "}
									<div
										onClick={() => handleMenu("btn3")}
										className=" block md:inline md:static md:bg-transparent md:text-[#7151ed] bg-[#7151ed] text-white rounded-md text-center  absolute cursor-pointer right-0 top-0 w-[30px] text-2xl"
									>
										{" "}
										<KeyboardArrowDownIcon />
									</div>
									<ul
										className={`pl-8 flex flex-col gap-2  ${
											Buttons.btn3 ? "active" : "test"
										}`}
									>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500 mt-2"
										>
											<li>Crime & Detectives</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Comedy</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Fantasy Fiction</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Horror</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Mystery</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Romantic</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Tragedy</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Thriller / Suspense</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Fairy Tales</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Fan Fiction</li>
										</Link>
										<Link
											to={"/"}
											className="hover:text-[#7151ed] transition duration-500"
										>
											<li>Fictional Biography</li>
										</Link>
									</ul>
								</li>
							</ul>
						</div>
						<Link to={"/"}>
							<li className="mb-4 md:mb-0">Contact Us</li>
						</Link>
						<Link to={"/"}>
							<li className="mt-4 md:mt-0">FAQ</li>
						</Link>
					</div>
				</ul>
			</nav>
		</div>
	);
};

export default MegaMenu;
