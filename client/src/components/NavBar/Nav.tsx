import "../../App.css";

const Nav = () => {
	return (
		<>
			<nav className="bg-violet-700 text-white ">
				<ul className="flex gap-4 justify-center">
					<li className="test mr-6 ">
						<h1 className="cursor-pointer p-4">home</h1>
						<ul className=" text-white ss bg-black rounded-md px-4 cursor-pointer absolute ">
							<li>One</li>
							<li className="mt-2">Two</li>
							<li className="mt-2 pb-2">Three</li>
						</ul>
					</li>
					<li>About</li>
					<li>Our New Books</li>
					<li>Contact</li>
				</ul>
			</nav>
		</>
	);
};

export default Nav;
