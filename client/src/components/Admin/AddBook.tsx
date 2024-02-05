import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { FormEvent, useRef, useState } from "react";
import { SyncLoader } from "react-spinners";
import useDebouncedCallback from "../../hooks/useDebounce";
import api from "../../utils/api";
import { useAuth } from "../../contexts/Auth";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
	const [loading, setLoading] = useState(false);
	const form = useRef<HTMLFormElement>(null);
	const { notifyLogin } = useAuth();
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		debounceAddBook();
	};
	const debounceAddBook = useDebouncedCallback(async () => {
		try {
			const formData = new FormData(form.current!);

			const { data } = await api.post("/api/books", formData, {
				withCredentials: true,

				headers: {
					Accept: "multipart/form-data",
				},
			});
			console.log(data);
			setLoading(false);
			notifyLogin("Added Successfully");
			form.current?.reset();
		} catch (error: any) {
			console.log(error);
			setLoading(false);
		}
	});
	return (
		<>
			<form
				className="grid grid-cols-2  w-3/4 gap-10 my-8 mx-auto"
				onSubmit={handleSubmit}
				encType="multipart/form-data"
				ref={form}
			>
				<label className="font-medium text-lg">Book name </label>
				<input
					type="text"
					name="name"
					placeholder="Book Name"
					className="text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
				/>
				<label className="font-medium text-lg">Price </label>
				<input
					type="number"
					name="price"
					placeholder="Price"
					min={10}
					className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
				/>
				<label className="font-medium text-lg">Quantity </label>
				<input
					type="number"
					name="quantity"
					placeholder="Quantity"
					min={1}
					className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
				/>
				<label className="font-medium text-lg">Author </label>
				<input
					type="text"
					name="author"
					placeholder="Author"
					className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
				/>
				<label className="font-medium text-lg">Publisher </label>
				<input
					type="text"
					name="publisher"
					placeholder="Publisher"
					className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
				/>
				<label className="font-medium text-lg">Category </label>
				<input
					type="text"
					name="category"
					placeholder="Category"
					className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
				/>
				<label className="font-medium text-lg">Image </label>
				<label
					className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-4 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
					tabIndex={0}
				>
					<span className="flex items-center space-x-2">
						<svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
							<path
								d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="24"
							></path>
							<path
								d="M80,128a80,80,0,1,1,144,48"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="24"
							></path>
							<polyline
								points="118.1 161.9 152 128 185.9 161.9"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="24"
							></polyline>
							<line
								x1="152"
								y1="208"
								x2="152"
								y2="128"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="24"
							></line>
						</svg>
						<span className="text-xs font-medium text-gray-600">
							Drop files to Attach, or{" "}
							<span className="text-blue-600 underline">browse</span>
						</span>
					</span>
					{/* <input
						name="image"
						id="photo-dropbox"
						type="file"
						className="sr-only"
						
					/> */}
					<input name="image" type="file" />
				</label>
				<label className="font-medium text-lg">Description</label>
				<TextareaAutosize
					className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
					aria-label="Demo input"
					placeholder="Description"
					name="description"
				/>
				<div className="col-span-2 flex justify-center ">
					<button
						type="submit"
						className="bg-[#7151ed] border-2  loginBtn w-1/2  border-[#7151ed] hover:bg-white  hover:text-[#7151ed] text-white  rounded-md  duration-300   transition-colors p-2  mt-4 "
					>
						<SyncLoader
							color="white"
							loading={loading}
							size={7}
							speedMultiplier={0.7}
						/>
						<span
							className={`relative z-[1000] font-semibold ${
								loading ? "hidden" : "inline "
							}`}
						>
							Add Book
						</span>{" "}
					</button>{" "}
				</div>
			</form>
		</>
	);
};

export default AddBook;
