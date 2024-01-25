import { type ChangeEvent, useState } from "react";
import useDebouncedCallback from "../../hooks/useDebounce";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { Link } from "react-router-dom";

export interface Book {
	_id: number;
	name: string;
	price: number;
	quantity: number;
	category: string;
	author: string;
	publisher: string;
	image: string;
}

const Search = () => {
	const [Books, setBooks] = useState<Book[]>([]);
	const [openSearch, setopenSearch] = useState(false);
	const [loading, setloading] = useState(false);

	const debounce = useDebouncedCallback(async (text: string) => {
		try {
			const { data } = await api.get(`/api/books/search?name=${text}`);
			console.log(data);
			setBooks(data);
		} catch (error) {
			console.log(error);
			toast.error("Error happened", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
			});
		} finally {
			setloading(false);
		}
	});
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length > 1) {
			setBooks([]);
			setloading(true);
			setopenSearch(true);
			debounce(event.target.value);
		} else {
			setopenSearch(false);
			event.target.value == "";
		}
	};
	return (
		<div className="w-full flex-1 md:w-1/3 lg:w-1/4 ">
			<form
				action=""
				className={`w-full relative arrow ${
					openSearch ? "before:visible" : "before:hidden"
				}`}
			>
				<input
					type="text"
					placeholder=" Search for the perfect book ..."
					onChange={handleInputChange}
					className="outline-none border-gray-200 border-solid border-2 rounded-md py-[6px] px-2 pr-14 w-full "
				/>
				<button
					type="button"
					className="bg-[#7151ed] text-white px-[18px] h-[40px] absolute right-0 hover:text-[#7151ed] hover:bg-white duration-300 border-[#7151ed] hover:border-gray-200 border-2 rounded-l-[2px]  rounded-r-[6px] "
				>
					Go
				</button>
				<div
					className={`absolute z-50 bg-white mt-3 rounded-md w-full  py-2 max-h-[350px] overflow-auto shadow-box ${
						openSearch ? "visible" : "hidden"
					} `}
				>
					<div className="flex justify-center">
						<ClipLoader loading={loading && !Books.length} color="#7151ed" />
					</div>
					<ul className="z-30 ">
						{Books.length
							? Books.map((book) => (
									<Link
										to={`/book/${book._id}`}
										key={book._id}
										onClick={() => setopenSearch((prev) => !prev)}
									>
										<li className="py-4 border-b border-gray-400 hover:bg-[#eee] transition-all px-4">
											<div className="flex gap-4 ">
												<img
													src={book.image}
													alt=""
													className="w-2/12 h-auto"
												/>
												<div className="flex-col ">
													<span className="text-xl font-semibold">
														{book.name}
													</span>
													<h4 className="text-[#7151ed] font-semibold text-2xl">
														<del className="mr-2 text-xl text-[#888a92]">
															${(book.price + 100).toFixed(2)}
														</del>
														${book.price.toFixed(2)}
													</h4>
													<h2 className="text-xl font-medium text-[#713ABE] uppercase">
														{book.publisher}
													</h2>
												</div>
											</div>
										</li>
									</Link>
							  ))
							: ""}
					</ul>
				</div>
			</form>
		</div>
	);
};
export default Search;
