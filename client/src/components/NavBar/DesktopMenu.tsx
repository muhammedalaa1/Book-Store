import { Link } from "react-router-dom";
import "./navbar.scss";

const DesktopMenu = () => {
	return (
		<div className="text-[#7151ed] font-semibold text-lg ">
			<nav className="md:block hidden custom-container">
				<ul className="md:flex md:border-none items-center md:ml-12 gap-24 block border-t-4 py-6 border-t-[#7151ed]">
					<Link to={"/"}>
						<li className="mb-4 md:mb-0 ">Home</li>
					</Link>

					<li className="relative show-mega-menu mb-4 md:mb-0">
						<Link to={"/"} className="md:p-4 p-0">
							About
						</Link>
						<div className=" custom-mega-menu mt-4 absolute xl:left-[-10px] lg:left-[-120px] md:left-[-200px] bg-white rounded-md p-4 flex gap-12 border-b-8 border-b-[#7151ed] ">
							<div className=" border-r border-r-[#e6e6e6]  lg:w-[270px] md:w-[120px]">
								<h1 className="text-2xl font-semibold mb-6">Featured</h1>
								<ul className=" text-[#52545a] text-[15px] hover:z-10 ">
									<Link
										className="hover:text-[#7151ed] transition duration-500  "
										to={"/"}
									>
										<li className="mb-4">Trending</li>
									</Link>
									<Link
										className="hover:text-[#7151ed] transition duration-500 "
										to={"/"}
									>
										<li className="mb-2 mt-4">Newest Books</li>
									</Link>
								</ul>
							</div>
							<div className=" w-[300px]  ">
								<h1 className="text-2xl font-semibold mb-6">Categories</h1>
								<ul className=" text-[15px] text-[#52545a] ">
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Crime & Detectives</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Comedy</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Fantasy Fiction</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Horror </li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Mystery</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Romantic</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Tragedy</li>
									</Link>
								</ul>
							</div>
							<div className="pt-[59px] text-[15px] text-[#52545a] ">
								<ul className="w-[150px]">
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2 ">Thriller / Suspense</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500 "
									>
										<li className="mb-2 ">Fairy Tales</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Fan Fiction</li>
									</Link>
									<Link
										to={"/"}
										className="hover:text-[#7151ed] transition duration-500"
									>
										<li className="mb-2">Fictional Biography</li>
									</Link>
								</ul>
							</div>
							<div>
								<img
									className="w-[90%] mt-16"
									src="./../../.././megamenu.png"
									alt=""
								/>
							</div>
						</div>
					</li>
					<Link to={"/"}>
						<li className="mb-4 md:mb-0">Contact Us</li>
					</Link>
					<Link to={"/"}>
						<li className="mt-4 md:mt-0">FAQ</li>
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default DesktopMenu;
