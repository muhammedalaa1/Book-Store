import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import ImagePixelExtractor from "../ImagePixel";
import { StarOutlineOutlined, FavoriteBorder } from "@material-ui/icons";
import useDebouncedCallback from "../../hooks/useDebounce";
import { SyncLoader } from "react-spinners";

import style from "./Book.module.scss";
import { useAuth } from "../../contexts/Auth";
import { Link } from "react-router-dom";
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
  const [OpenReview, setOpenReview] = useState(false);
  const [ReviewData, setReviewData] = useState({
    name: "",
    email: "",
    review: "",
  });

  const { handleAddBook, AllBooks } = useAuth();
  const debounceAdd = useDebouncedCallback(async () => {
    await handleAddBook(Book?._id);
    setloading(false);
  });

  const handleAdd = async () => {
    setloading(true);
    debounceAdd(Book?._id);
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        <div>
          <div
            style={{ backgroundColor: boxShadows[Book._id] }}
            className={`${
              font[Book._id] === "0" ? "text-black" : "text-white"
            }  font-medium flex flex-col px-4 pt-10 `}
          >
            <div className="custom-container ">
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
          <section className="custom-container mt-12 flex md:flex-row flex-col gap-12  ">
            <div className="w-5/6">
              <div className="flex justify-end pt-4 mb-8">
                <ul>
                  <li>
                    <div className="">Genre: </div>

                    <span className="text-sm text-[#888a92]">
                      {Book.category}
                    </span>
                  </li>
                </ul>
              </div>
              <div className=" border-b border-[#cecfd3] pb-8 ">
                <h2 className="text-4xl font-semibold mb-6 ">OverView</h2>
                <p>{Book.description}</p>
              </div>
              <div className="flex md:flex-row flex-col mt-12 border-b border-[#cecfd3] pb-4">
                <div className="w-1/2">
                  <h6 className="text-[#888a92] uppercase font-medium mb-6">
                    {" "}
                    Book Details{" "}
                  </h6>
                  <ul className="flex flex-col gap-4 font-medium">
                    <li>
                      Hardcover: <span className="font-normal">Yes</span>
                    </li>
                    <li>
                      Publisher:{" "}
                      <span className="font-normal">{Book.publisher}</span>
                    </li>
                    <li>
                      Language: <span className="font-normal">En</span>
                    </li>
                    <li>
                      Dimensions: <span className="font-normal">NA</span>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <h6 className="text-[#888a92] uppercase mb-4 md:mt-0 mt-12">
                    Preview
                  </h6>
                  <div className="flex gap-4 ">
                    <div className="w-1/4 hover:opacity-70 transition-all cursor-pointer duration-300">
                      <img
                        src="../../../post-7-230x300.jpg"
                        alt=""
                        className=" w-full rounded-md"
                      />
                    </div>
                    <div className="w-1/4 hover:opacity-70 transition-all cursor-pointer duration-300">
                      <img
                        src="../../../post-10-230x300.jpg  "
                        alt=""
                        className=" w-full rounded-md"
                      />
                    </div>
                    <div className="w-1/4 hover:opacity-70 transition-all cursor-pointer duration-300">
                      <img
                        src="../../../post-8-230x300.jpg "
                        alt=""
                        className=" w-full rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <div className="flex md:flex-row flex-col justify-between">
                  <h1 className="md:text-4xl text-xl font-semibold">
                    Customer Reviews
                  </h1>
                  <button
                    onClick={() => setOpenReview(!OpenReview)}
                    className="bg-[#7151ed] border-2 loginBtn md:mt-0 mt-12  border-[#7151ed] hover:bg-white  hover:text-[#7151ed] text-white  rounded-md  duration-300 transition-colors py-2 px-12"
                  >
                    <span className="font-semibold">Write a Review</span>
                  </button>
                </div>
                <form
                  action=""
                  className={`border-t border-[#cecfd3] pt-4 mt-12 transition-all ${
                    OpenReview ? "opacity-1 h-full" : "opacity-0 max-h-0"
                  }`}
                >
                  <h2 className="text-2xl font-semibold mt-8">
                    Be the first to review {Book.name}
                  </h2>
                  <span>
                    Your email address will not be published. Required fields
                    are marked <span className="text-red-700">*</span>
                  </span>
                  <div className="flex md:flex-row flex-col gap-12">
                    <p className="mt-8">
                      <label htmlFor="name">
                        Name<span className="text-red-700">*</span>{" "}
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={ReviewData.name}
                        onChange={handleChange}
                        required
                        id=""
                        className="block outline-none border border-[#e5e6ea] px-2 h-[40px] focus:border focus:border-[#7151ed] transition-all rounded-md mt-3"
                      />
                    </p>

                    <p className="mt-8">
                      <label htmlFor="email">
                        Email<span className="text-red-700">*</span>{" "}
                      </label>

                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={ReviewData.email}
                        required
                        id=""
                        className="block outline-none border border-[#e5e6ea] px-2 h-[40px] focus:border focus:border-[#7151ed] transition-all rounded-md mt-3"
                      />
                    </p>
                  </div>
                  <p className="mt-8">
                    <label htmlFor="review">
                      Your Review<span className="text-red-700">*</span>{" "}
                    </label>
                    <textarea
                      name="review"
                      onChange={handleChange}
                      value={ReviewData.review}
                      required
                      id=""
                      className="block outline-none py-5 border border-[#d7d8da] px-2 h-[200px] w-full focus:border focus:border-[#7151ed] transition-all rounded-md mt-3"
                    />
                  </p>
                  <div className="justify-center flex">
                    <button
                      type="submit"
                      disabled
                      className="bg-[#7151ed] mt-8 border-2 loginBtn border-[#7151ed] hover:bg-white  hover:text-[#7151ed] text-white  rounded-md  duration-300 transition-colors py-2 px-12"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="border-t border-[#cecfd3] p-2 mt-4">
                No Reviews Yet!
              </div>
            </div>
            <div className="pt-24">
              <div className="mb-4">
                Books By :{" "}
                <span className="text-[#7151ed] font-semibold">
                  {Book.author}
                </span>
              </div>
              <ul className="border-t border-[#888a92] pt-4 ">
                {AllBooks.filter((book) => book.author === Book.author).map(
                  (item) => (
                    <li className="mb-4 ">
                      <Link to={`/Book/${item._id}`}>
                        <div className="flex gap-3">
                          <div className="max-w-[55px]">
                            <img
                              src={item.image}
                              className="max-w-full h-auto  rounded-[6px]"
                              loading="lazy"
                              alt="Book_img"
                            />
                          </div>
                          <div className="pl-4 ">
                            <h3 className="font-medium">{item.name}</h3>

                            <div className="text-[#7151ed]">
                              <del className="mr-2 font-light">
                                ${(item.price * 2).toFixed(2)}
                              </del>
                              <span className="font-semibold">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </section>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default Book;
