import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import "./Footer.scss";
import { LinkedIn, Twitter, Email } from "@material-ui/icons";
import { useAuth } from "../../contexts/Auth";
const Footer = () => {
  const { FeaturedBooks, AllBooks } = useAuth();
  let Categories = AllBooks.map((book) => book.category);
  Categories = [Categories.join(", ")];
  const unique = Array.from(new Set(Categories[0].split(", ")));
  console.log(unique);

  return (
    <>
      <div className="">
        {AllBooks && (
          <div className="container mt-12 pb-12 border-t border-[#888a92] pt-4">
            <footer className="flex xl:flex-row xl:justify-normal justify-center xl:items-stretch items-center flex-col px-12">
              <div className="xl:border-r xl:border-[#bbbdc2] pr-4 xl:w-1/4 w-full xl:block flex justify-center flex-col items-center xl:mb-0 mb-4">
                <div className="flex gap-3 items-center">
                  <img src="../../.././footer-logo.png" alt="" />

                  <div className="">
                    <Link to={"/"}>
                      <h6 className="font-croissant text-[#7151ed] duration-500 text-2xl xl:text-4xl md:text-3xl sm:text-3xl  cursor-pointer	">
                        Book Store
                      </h6>
                    </Link>
                    <p className="text-gray-500">Book Store & Reviews</p>
                  </div>
                </div>
                <p className="mt-4 text-[#666] leading-7 text-sm xl:w-full w-2/3 text-center xl:text-left">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
                  ipsa dignissimos incidunt, nulla esse doloribus sit ratione
                  cum sunt, libero mollitia molestias eum, dolor quisquam
                  provident magnam similique beatae. Reiciendis?
                </p>
                <ul className="flex gap-6 mt-3">
                  <li>
                    <Link
                      to={"/"}
                      className="text-[#3b5998] duration-300 transition-all hover:text-[#7151ed] "
                    >
                      {" "}
                      <FacebookIcon fontSize="medium" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/"}
                      className=" duration-300 transition-all hover:text-[#7151ed] text-[#0e76a8]  "
                    >
                      {" "}
                      <LinkedIn fontSize="medium" />
                    </Link>
                  </li>{" "}
                  <li>
                    {" "}
                    <Link
                      to={"/"}
                      className="text-[#00acee] duration-300 transition-all hover:text-[#7151ed] "
                    >
                      <Twitter fontSize="medium" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="pl-4 xl:w-1/3  w-full xl:mt-0 mt-8">
                <h4 className="text-xl font-semibold mb-4 xl:text-start text-center">
                  Recent Books
                </h4>
                {FeaturedBooks
                  ? FeaturedBooks.slice(0, 3).map((book) => (
                      <div key={book._id} className="mb-3 w-full">
                        <Link to={`/Book/${book._id}`}>
                          <div className="flex xl:flex-row flex-col justify-center items-center text-center  gap-2 border-b border-[#888a92] pb-2 ">
                            <div
                              className={`rounded-[6px] h-fit overflow-hidden max-w-[55px]  `}
                            >
                              <img
                                src={book.image}
                                className="max-w-full h-auto "
                                loading="lazy"
                                alt="Book_img"
                              />
                            </div>
                            <div className="pl-4 w-3/4">
                              <h3 className="font-medium">{book.name}</h3>
                              <p className="text-[#888a92]">by :</p>
                              <p className="text-[#888a92] text-sm">
                                {book.author}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  : null}
              </div>
              <div className="xl:ml-4 xl:mr-12 xl:w-1/3 w-full  xl:block ">
                <h4 className=" font-semibold mb-4 text-center">Genres</h4>
                <ul className="grid xl:grid-cols-2 grid-cols-1 xl:gap-0 gap-2  h-full justify-center items-center text-center ">
                  {unique.map((item) => (
                    <li
                      key={item}
                      className=" xl:mr-4 hover:text-[#7151ed] cursor-pointer transition-all text-[#888a92] font-semibold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col xl:justify-start xl:items-stretch xl:text-left justify-center items-center text-center mt-12">
                <h4 className=" font-semibold mb-4">Contact</h4>
                <ul className="flex flex-col gap-4 text-[#888a92] font-semibold ">
                  <li>Book Store,</li>
                  <li>Street 3 Cairo ,</li>
                  <li>Egypt</li>
                  <li>Phone : 01017485904</li>
                  <li>Email:muhammedalaa2213@gmail.com</li>
                </ul>
              </div>
            </footer>
          </div>
        )}
        <div className="bg-[#f9fafc] pt-3 pb-4">
          <div className="container">
            <p className="text-center text-[#888a92] font-semibold">
              Copyright © 2023{" "}
              <span className="text-[#7151ed]">Muhammed Alaa</span>. All Right
              Received
            </p>
            <ul className="flex gap-4 justify-center items-center">
              <Link
                to={"https://www.facebook.com/muhammedalaa2213"}
                target="_blank"
                className="text-[#888a92] duration-300 transition-all hover:text-[#3b5998] "
              >
                {" "}
                <FacebookIcon fontSize="medium" />
              </Link>{" "}
              <Link
                to={"https://www.linkedin.com/in/muhammed-alaa-b878051b8/"}
                target="_blank"
                className=" duration-300 transition-all hover:text-[#0072b1] text-[#888a92]  "
              >
                {" "}
                <LinkedIn fontSize="medium" />
              </Link>{" "}
              <Link
                to={"https://mail.google.com/mail/u/0/#inbox?compose=new"}
                target="_blank"
                className=" duration-300 transition-all hover:text-[#0e76a8] text-[#888a92]  "
              >
                {" "}
                <Email fontSize="medium" />
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
