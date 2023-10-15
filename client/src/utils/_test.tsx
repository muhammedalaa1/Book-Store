import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./books.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface BooksProps {
	boxShadows: Record<string, string>;
	boxShadows1: Record<string, string>;
}

const test: React.FC<BooksProps> = ({ boxShadows, boxShadows1 }) => {
	const { FeaturedBooks, AllBooks } = useAuth();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const category: any = params.get("category");
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
							</aside>
						</div>
					</div>
					<div className="lg:w-3/4 w-full text-[#888a92] font-semibold">
						<div className="lg:flex lg:justify-between border-b border-b-[#888a92]  pb-5">
							<h3 className="uppercase px-5 ">Browse By Category</h3>
							<ul className="flex-col  gap-8 sm:flex sm:flex-row px-5  ">
								<li className="cursor-pointer ">
									<Link
										to={"?category=All"}
										className={`${
											category?.toLowerCase() == "all" || !category
												? "md:border-b-[5px] pb-2 md:border-b-[#7151ed] text-[#7151ed]"
												: styles.browse
										} relative `}
									>
										{" "}
										All
									</Link>
								</li>
								<li>
									<Link
										to={"?category=Comedy"}
										className={`${
											category?.toLowerCase() == "comedy"
												? "md:border-b-[5px] pb-2 md:border-b-[#7151ed] text-[#7151ed]"
												: styles.browse
										} relative `}
									>
										{" "}
										Comedy
									</Link>
								</li>
								<li>
									{" "}
									<Link
										to={"?category=Romance"}
										className={`${
											category?.toLowerCase() == "romance"
												? "md:border-b-[5px] pb-2 md:border-b-[#7151ed] text-[#7151ed] "
												: styles.browse
										} relative `}
									>
										{" "}
										Romance
									</Link>
								</li>
								<li>
									{" "}
									<Link
										to={"?category=Thriller"}
										className={`${
											category?.toLowerCase() == "thriller"
												? "md:border-b-[5px] pb-2 md:border-b-[#7151ed] text-[#7151ed]"
												: styles.browse
										} relative `}
									>
										{" "}
										Thriller
									</Link>
								</li>
								<li>
									{" "}
									<Link
										to={"?category=Media"}
										className={`${
											category?.toLowerCase() == "media"
												? "md:border-b-[5px] pb-2 md:border-b-[#7151ed] text-[#7151ed] "
												: styles.browse
										} relative `}
									>
										{" "}
										Media
									</Link>
								</li>
								<li>
									{" "}
									<Link
										to={"?category=Cooking"}
										className={`${
											category?.toLowerCase() == "cooking"
												? "md:border-b-[5px] pb-2 md:border-b-[#7151ed] text-[#7151ed]"
												: styles.browse
										} relative `}
									>
										{" "}
										Cooking
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex flex-wrap gap-28  relative">
							<AnimatePresence>
								{AllBooks && boxShadows
									? AllBooks.map((book) => {
											return (
												<motion.div
													key={book._id}
													layout
													animate={{ opacity: 1 }}
													initial={{ opacity: 0 }}
													className={
														category == "All" ||
														!category ||
														book.category.split(", ").includes(category)
															? "block md:w-1/4 w-full mt-2 overflow-hidden md:mx-0 mx-4"
															: "hidden"
													}
												>
													<img
														src={book.image}
														className="rounded"
														alt="nothing"
														width="100%"
													/>
												</motion.div>
											);
									  })
									: ""}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default test;
