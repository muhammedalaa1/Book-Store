import { useAuth } from "../../contexts/Auth";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ImagePixelExtractor from "../ImagePixel";
import { Link } from "react-router-dom";
import { StarOutlineOutlined } from "@material-ui/icons";
interface FeaturedProps {
  boxShadows: Record<string, string>;
  font: Record<string, string>;
  handlePixelExtracted: (pixelData: number[], bookId: string) => void;
}
const Featured: React.FC<FeaturedProps> = ({
  boxShadows,
  font,
  handlePixelExtracted,
}) => {
  const { FeaturedBooks, AllBooks } = useAuth();
  return (
    <>
      {AllBooks
        ? AllBooks.map((book) => (
            <ImagePixelExtractor
              key={book._id}
              imageUrl={book.image}
              onPixelExtracted={(pixelData) =>
                handlePixelExtracted(pixelData, book._id)
              }
            />
          ))
        : ""}{" "}
      {FeaturedBooks ? (
        <section className="bg-white pb-14   ">
          <div className="container font-nunito ">
            <p className="py-8 custom-header text-center">
              This Week Featured Books
            </p>
            {
              <div className="">
                {" "}
                <Swiper
                  className="w-full relative"
                  pagination={{
                    dynamicBullets: true,
                    clickable: true,
                  }}
                  scrollbar={{ draggable: true }}
                  modules={[Pagination]}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {FeaturedBooks.map((book) => (
                    <SwiperSlide
                      key={book._id}
                      className={` rounded-xl h-[300px]    md:h-[245px] `}
                      style={{ backgroundColor: boxShadows[book._id] }}
                    >
                      <div className="p-3 ">
                        <h3
                          className={`${
                            font[book._id] === "0" ? "text-black" : "text-white"
                          }  font-medium`}
                        >
                          <Link
                            to={"/"}
                            className="hover:text-[#7151ed] duration-500 cursor-pointer"
                          >
                            {book.name}
                          </Link>
                        </h3>
                        <p className="font-medium text-sm mt-1">
                          <span className="hover:text-[#7151ed] duration-500 cursor-pointer">
                            By
                          </span>{" "}
                          :{" "}
                          <span className="hover:text-[#7151ed] duration-500 cursor-pointer">
                            {book.author}
                          </span>
                        </p>
                        <div className="flex items-center mb-2">
                          <StarOutlineOutlined fontSize="small" />
                          <StarOutlineOutlined fontSize="small" />
                          <StarOutlineOutlined fontSize="small" />
                          <StarOutlineOutlined fontSize="small" />
                          <StarOutlineOutlined fontSize="small" />
                          <p className="text-xs">0 Ratings</p>
                        </div>
                        <div
                          className="lg:w-3/4 mt-2 w-[74%] 
                  "
                        >
                          <p
                            className={`${
                              font[book._id] === "0"
                                ? "text-black"
                                : "text-white"
                            }  font-medium`}
                          >
                            {book.description.slice(0, 90)}.
                          </p>
                        </div>
                        <div>
                          <img
                            src={book.image}
                            alt=""
                            className="md:w-1/4 w-[21%] absolute top-2 md:bottom-2 right-3 rounded-md"
                          />
                        </div>
                      </div>
                      <button className="p-2 mt-2 ml-2 rounded-3xl bg-[#ffffffad] hover:bg-white duration-500">
                        <Link to={"/"} className="p-6 font-semibold">
                          View in Book Store
                        </Link>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>{" "}
              </div>
            }
          </div>
        </section>
      ) : (
        "loading"
      )}
    </>
  );
};

export default Featured;
