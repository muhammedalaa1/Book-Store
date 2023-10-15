import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import ImagePixelExtractor from "../ImagePixel";
import { StarOutlineOutlined, FavoriteBorder } from "@material-ui/icons";
import useDebouncedCallback from "../../hooks/useDebounce";
import { SyncLoader } from "react-spinners";

import style from "./Book.module.scss";
import { useAuth } from "../../contexts/Auth";
interface Params {
	id: string;
	[key: string]: string | undefined;
}
interface BookProps {
	boxShadows: Record<string, string>;
	boxShadows1: Record<string, string>;
	font: Record<string, string>;
	handlePixelExtracted: (pixelData: number[], bookId: string) => void;
}
interface Book {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	category: string;
	author: string;
	publisher: string;
	image: string;
	description: string;
}
const Book: React.FC<BookProps> = ({
	boxShadows,
	boxShadows1,
	handlePixelExtracted,
	font,
}) => {
	const [Book, setBook] = useState<Book>();
	const params = useParams<Params>();
	const [loading, setloading] = useState(false);

	const { handleAddBook } = useAuth();
	const debounceAdd = useDebouncedCallback(async () => {
		await handleAddBook(Book?._id);
		setloading(false);
	});

	const handleAdd = async () => {
		setloading(true);
		debounceAdd(Book?._id);
	};

	useEffect(() => {
		const getBook = async () => {
			try {
				const { data } = await api.get(`/api/books/${params.id}`);
				setBook(data);
			} catch (error) {
				console.log(error);
			}
		};

		getBook();
	}, [params]);
	return (
		<>
			{Book && (
				<ImagePixelExtractor
					imageUrl={Book.image}
					onPixelExtracted={(pixelData) =>
						handlePixelExtracted(pixelData, Book._id)
					}
				/>
			)}

			{Book && boxShadows[Book._id] ? (
				<div className="">
					<div
						style={{ backgroundColor: boxShadows[Book._id] }}
						className={`${
							font[Book._id] === "0" ? "text-black" : "text-white"
						}  font-medium flex px-4 pt-10 `}
					>
						<div className="custom-container">
							<div className="flex md:flex-row flex-col items-center justify-center  pt-20 ">
								<div className="md:mb-[-50px] mb-8">
									<img src={Book.image} alt="" className="rounded-md w-5/6" />
								</div>
								<div className="w-2/3">
									<h1
										className={`${
											font[Book._id] === "0" ? "text-black" : "text-white"
										}  text-sm `}
									>
										By : {Book.author}
									</h1>
									<h2 className="text-5xl  my-4">{Book?.name}</h2>
									<div className="flex items-center mb-2 font-normal text-[#7151ed]">
										<StarOutlineOutlined fontSize="small" />
										<StarOutlineOutlined fontSize="small" />
										<StarOutlineOutlined fontSize="small" />
										<StarOutlineOutlined fontSize="small" />
										<StarOutlineOutlined fontSize="small" />
										<p className="text-xs ml-2 mt-[2px]">0 Ratings</p>
									</div>
									<p className="font-normal w-4/5">{Book.description}</p>
									<div className="md:flex md:gap-4 w-fit ">
										<button
											className={`mt-8 bg-[#7151ed] text-white h-[40px]  flex items-center px-12 hover:text-[#7151ed] hover:bg-white duration-300 border-[#7151ed] border-2 rounded-[6px] ${style.mainShadow}`}
											onClick={handleAdd}
										>
											<SyncLoader
												color="white"
												loading={loading}
												size={7}
												speedMultiplier={0.7}
											/>
											<span
												className={`${
													loading ? "hidden" : "inline font-semibold"
												}`}
											>
												Buy ${Book.price.toFixed(2)}
											</span>
										</button>
										<button
											className="mt-8 bg-transparent text-white h-[40px] flex items-center px-6 mb-8 hover:text-[#7151ed] hover:bg-white duration-300 border-white border-2 rounded-[6px] md:text-base text-sm "
											style={{ boxShadow: boxShadows1[Book._id] }}
										>
											<FavoriteBorder fontSize="medium" className="mr-2" />
											<span> Add To BookShelf</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				"Loading"
			)}
		</>
	);
};

export default Book;
