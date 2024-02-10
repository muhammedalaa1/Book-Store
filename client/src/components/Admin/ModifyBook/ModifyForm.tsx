import React, { FormEvent, useEffect, useRef } from "react";
import { SyncLoader } from "react-spinners";
import { TextareaAutosize } from "@mui/material";
import api from "../../../utils/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/Auth";
import Book from "../../Book/Book";

const ModifyForm: React.FC<{
  loading: boolean;
  setloading: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedBook: Book | undefined;
}> = ({ SelectedBook, loading, setloading }) => {
  const form = useRef<HTMLFormElement>(null);
  const { setAllBooks } = useAuth();
  useEffect(() => {
    if (SelectedBook) {
      for (const name of Object.keys(SelectedBook!)) {
        const element = form.current?.elements.namedItem(
          name
        ) as HTMLInputElement;
        if (element && SelectedBook) {
          element.value = SelectedBook[name as keyof typeof Book];
        }
      }
    }
  }, [SelectedBook]);

  const test = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!SelectedBook) {
      toast.error("Please select an existing book", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setloading(!loading);
    var formData = new FormData(form.current!);
    try {
      await api.patch(`/api/books/${SelectedBook?._id}`, formData);
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      form.current?.reset();
      setAllBooks((prev: Book[]) =>
        prev.map((book: Book) => {
          if (book._id === SelectedBook?._id) {
            return {
              ...book,
              name: formData.get("name") as string,
              price: Number(formData.get("price")),
              quantity: Number(formData.get("quantity")),
              author: formData.get("author") as string,
              publisher: formData.get("publisher") as string,
              category: formData.get("category") as string,
              description: formData.get("description") as string,
            };
          }
          return book;
        })
      );

      console.log("test");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(!loading);
    }
  };
  return (
    <>
      <form
        className="grid grid-cols-2  w-3/4 gap-10 my-8 mx-auto"
        ref={form}
        onSubmit={test}
      >
        <label className="font-medium text-lg">Book name </label>
        <input
          required
          type="text"
          name="name"
          placeholder="Book Name"
          className="text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
        />
        <label className="font-medium text-lg">Price </label>
        <input
          required
          type="number"
          name="price"
          placeholder="Price"
          min={10}
          className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
        />
        <label className="font-medium text-lg">Quantity </label>
        <input
          required
          type="number"
          name="quantity"
          placeholder="Quantity"
          min={1}
          className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
        />
        <label className="font-medium text-lg">Author </label>
        <input
          required
          type="text"
          name="author"
          placeholder="Author"
          className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
        />
        <label className="font-medium text-lg">Publisher </label>
        <input
          required
          type="text"
          name="publisher"
          placeholder="Publisher"
          className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
        />
        <label className="font-medium text-lg">Category </label>
        <input
          required
          type="text"
          name="category"
          placeholder="Category"
          className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
        />

        <label className="font-medium text-lg">Description</label>
        <TextareaAutosize
          required
          className="' text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600  dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
          aria-label="Demo input"
          placeholder="Description"
          name="description"
        />
        <div className="col-span-2 flex justify-center ">
          <button className="bg-[#7151ed] border-2  loginBtn w-1/2  border-[#7151ed] hover:bg-white  hover:text-[#7151ed] text-white  rounded-md  duration-300   transition-colors p-2  mt-4 ">
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
              Modify Book
            </span>{" "}
          </button>{" "}
        </div>
      </form>
    </>
  );
};

export default ModifyForm;
