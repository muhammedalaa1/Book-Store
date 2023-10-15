import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./books.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../contexts/Auth";

interface BooksProps {
	boxShadows: Record<string, string>;
	boxShadows1: Record<string, string>;
}

const Books: React.FC<BooksProps> = ({ boxShadows, boxShadows1 }) => {
	const { FeaturedBooks, AllBooks } = useAuth();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const category: any = params.get("category");
	const Authors = [...new Set(AllBooks.map((b) => b.author))];

	return (
		<>
			<div className="relative">
				<div className="py-12">
					<h1 className="text-center text-3xl text-[#888a92]">
						Browse Our Books
					</h1>
				</div>
				<div className="block lg:flex gap-6">
					<div className="w-full lg:w-1/4 px-0 ">
						<div className="flex flex-col px-4">
							<aside className="flex flex-col ">
								<h2 className="uppercase text-lg text-[#888a92] mb-4 border-b border-b-[#888a92]  pb-4">
									Newest Release
								</h2>
								{FeaturedBooks
									? FeaturedBooks.slice(0, 4).map((book) => (
											<div key={book._id} className="mb-8">
												<div className="flex ">
													<div
														className={`rounded-[6px] h-fit overflow-hidden max-w-[55px] `}
														style={{ boxShadow: boxShadows1[book._id] }}
													>
														<img
															src={book.image}
															className="max-w-full h-auto "
															loading="lazy"
															alt="Book_img"
														/>
													</div>
													<div className="pl-4 ">
														<h3 className="font-medium">{book.name}</h3>
														<p className="text-[#888a92]">by :</p>
														<p className="text-[#888a92] text-sm">
															{book.author}
														</p>
														<div className="text-[#7151ed]">
															<del className="mr-2 font-light">
																${(book.price * 2).toFixed(2)}
															</del>
															<span className="font-medium">
																${book.price.toFixed(2)}
															</span>
														</div>
													</div>
												</div>
											</div>
									  ))
									: null}
								<div className="mt-4 md:mb-0 mb-5">
									<h3 className="text-[#888a92] text-lg font-bold">
										Browse By Author
									</h3>
									<ul className="ml-4">
										{Authors.map((author, index) => (
											<li
												key={index}
												className="mt-4 font-semibold hover:text-[#7151ed] duration-300 flex gap-2"
											>
												<Link to={"/"}>{author}</Link>
											</li>
										))}
									</ul>
								</div>
							</aside>
						</div>
					</div>
					<div className="lg:w-3/4 w-full text-[#888a92] font-semibold ">
						<div className="lg:flex lg:justify-between border-b border-b-[#888a92]  pb-5 mb-5">
							<h3 className="uppercase px-5 ">Browse By Category</h3>
							<ul className="flex-col flex gap-3 lg:gap-8 sm:flex sm:flex-row px-5 justify-center items-center ">
								<li className="cursor-pointer w-full text-center category ">
									<Link
										to={"?category=All"}
										className={`${
											category?.toLowerCase() == "all" || !category
												? `md:border-b-[5px]  md:border-b-[#7151ed] ${styles.category} md:inline block`
												: styles.browse
										} relative `}
									>
										{" "}
										All
									</Link>
								</li>
								<li className="w-full text-center category">
									<Link
										to={"?category=Comedy"}
										className={`${
											category?.toLowerCase() == "comedy"
												? `md:border-b-[5px]  md:border-b-[#7151ed] ${styles.category} md:inline block`
												: styles.browse
										} relative `}
									>
										{" "}
										Comedy
									</Link>
								</li>
								<li className="w-full text-center category">
									{" "}
									<Link
										to={"?category=Romance"}
										className={`${
											category?.toLowerCase() == "romance"
												? `md:border-b-[5px]  md:border-b-[#7151ed] ${styles.category} md:inline block`
												: styles.browse
										} relative `}
									>
										{" "}
										Romance
									</Link>
								</li>
								<li className={`w-full text-center `}>
									{" "}
									<Link
										to={"?category=Thriller"}
										className={`${
											category?.toLowerCase() == "thriller"
												? `md:border-b-[5px]  md:border-b-[#7151ed] ${styles.category} md:inline block`
												: styles.browse
										} relative `}
									>
										{" "}
										Thriller
									</Link>
								</li>
								<li className="w-full text-center category">
									{" "}
									<Link
										to={"?category=Media"}
										className={`${
											category?.toLowerCase() == "media"
												? `md:border-b-[5px]  md:border-b-[#7151ed] ${styles.category} md:inline block`
												: styles.browse
										} relative `}
									>
										{" "}
										Media
									</Link>
								</li>
								<li className="w-full text-center category">
									{" "}
									<Link
										to={"?category=Cooking"}
										className={`${
											category?.toLowerCase() == "cooking"
												? `md:border-b-[5px]  md:border-b-[#7151ed] ${styles.category} md:inline block`
												: styles.browse
										} relative `}
									>
										{" "}
										Cooking
									</Link>
								</li>
							</ul>
						</div>
						<div className="grid xl:grid-cols-4	lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20 relative mx-4 ">
							<AnimatePresence>
								{AllBooks && boxShadows
									? AllBooks.map((book) => {
											if (
												category == "All" ||
												!category ||
												book.category.split(", ").includes(category)
											) {
												return (
													<motion.div
														key={book._id}
														layout
														animate={{ opacity: 1 }}
														initial={{ opacity: 0 }}
														exit={{ opacity: 0 }}
													>
														<div
															className={`block w-full mt-2 overflow-hidden md:mx-0 cursor-pointer transition-all duration-300 hover:drop-shadow-2xl`}
															style={{ boxShadow: boxShadows1[book._id] }}
														>
															<Link to={`Book/${book._id}`}>
																<img
																	src={book.image}
																	className="rounded-lg"
																	alt="nothing"
																	width="100%"
																	height="50%"
																/>
															</Link>
														</div>
														<div className=" mt-3">
															<p className=" text-black font-bold">
																{book.name}
															</p>
															<p className="text-sm">by : {book.author}</p>
															<del className="text-[#7151ed]">
																${book.price * 2}.00
															</del>
															<span className="ml-2 font-bold text-sm text-[#7151ed]">
																${book.price}.00
															</span>
														</div>
													</motion.div>
												);
											}
											return null;
									  })
									: ""}
							</AnimatePresence>
						</div>
						<div className="mx-4 mt-24">
							<div className="flex justify-between border-b border-b-gray-300 pb-2">
								<h4 className="text-xl">Popular Categories</h4>
								<h4 className="text-[#7151ed] font-semibold">
									<Link
										to={"/"}
										className="relative before:absolute  before:left-0 before:w-0 before:h-[2px] before:bottom-[-6px] before:transition-all  hover:before:w-full before:bg-[#7151ed]"
									>
										All Categories <span className="font-black">&gt;</span>
									</Link>
								</h4>
							</div>
							<div className="flex md:flex-row flex-col md:justify-between items-center gap-4 mt-6">
								<div className="w-3/4 relative">
									<span className="absolute top-0 left-1/2 translate-x-[-50%] mt-2 text-white uppercase text-xl">
										Thriller
									</span>
									<img
										className="rounded-md "
										src="../../../cate-thrillers.png"
										alt=""
									/>
								</div>
								<div className="w-3/4 relative">
									<span className="absolute top-0 left-1/2 translate-x-[-50%] mt-2 text-white uppercase text-xl">
										romantic
									</span>
									<img
										className="rounded-md "
										src="../../../cate-romantic.png"
										alt=""
									/>
								</div>
								<div className="w-3/4 relative">
									<span className="absolute top-0 left-1/2 translate-x-[-50%] mt-2 text-white uppercase text-xl">
										childrens
									</span>
									<img
										className="rounded-md "
										src="../../../childrens.png"
										alt=""
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Books;
