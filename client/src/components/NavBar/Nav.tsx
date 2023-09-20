import { Link } from "react-router-dom";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
const Nav = () => {
	return (
		<>
			<header className="block">
				<div className="pt-8 lg:text-start text-center ">
					<div className="container">
						<div className=" flex md:flex-row flex-col items-center gap-4 ">
							<div className="md:w-1/2  w-full md:mb-2.5 text-[#888a92]  duration-500 text-base">
								<Link to={"/login"} className="ml-4 hover:text-[#7151ed] mr-5">
									Login/Register
								</Link>
								<Link to={"/"} className="hover:text-[#7151ed] mr-5">
									FAQ
								</Link>
								<Link to={"/"} className="hover:text-[#7151ed] mr-5">
									Contact Us
								</Link>
							</div>
							<div className="md:w-1/2 w-full md:mb-2.5  flex md:justify-end md:mr-12 items-center justify-center">
								<div className="mr-1 pr-2 border-r border-r-gray-300 inline-block text-left pt-1">
									<div className=" items-center">
										<img
											src="../../.././icon-1.png"
											className="max-w-[35px] mr-2"
											alt=""
										/>
										<div className="">
											<Link
												to={"/books"}
												className="text-[#7151ed] font-medium mr-4 block"
											>
												Bookshelf
											</Link>
											<span>Books</span>
										</div>
									</div>
								</div>
								<div className="ml-8 inline-block">
									<ShoppingCart
										className="text-[#7151ed] mr-4"
										fontSize="large"
									></ShoppingCart>
									Your Basket
									<span className="block text-center">0.00</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Nav;
