import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./cart.scss";
import useDebouncedCallback from "../../hooks/useDebounce";
import ReactLoading from "react-loading";
import { ChangeEvent, FormEvent, useEffect, useLayoutEffect } from "react";
import { Book } from "../../contexts/Auth";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { useState } from "react";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import api from "../../utils/api";
const Cart = () => {
  const {
    cartItems,
    handleCart,
    handleAddBook,
    notifyError,
    total,
    setTotal,
    user,
    setCartItems,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cartQuantities, setCartQuantities] = useState<Book[]>([]);
  const [Coupon, setCoupon] = useState("");
  const [Display, setDisplay] = useState(true);
  const [Clicked, setClicked] = useState(cartItems?.coupon);
  useEffect(() => {
    setClicked(cartItems?.coupon);
    if (cartItems?.coupon) setCoupon("Discount");
  }, [cartItems?.coupon]);

  useLayoutEffect(() => {
    let computedTotal =
      cartItems?.books?.reduce((total, book) => {
        return total + book.price * book.quantity;
      }, 0) || 0;

    setTotal(computedTotal);
    setCartQuantities(() => cartItems?.books || []);
  }, [cartItems]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [loading]);
  const handleCheckout = async () => {
    await api
      .post("/api/stripeRouter/create-checkout-session", {
        cartItems,
        userId: user?._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCoupon = async () => {
    if (Coupon === "Discount") {
      if (!Clicked) {
        const { status } = await api.patch("/api/cart", {
          coupon: !Clicked,
          userId: user?._id,
        });
        if (status == 200) {
          toast.success("Congratulations you got a 10% discount ! ", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
          setCartItems((prev) => {
            if (prev) {
              return { ...prev, coupon: true }; // Create a new object with updated coupon property
            }
            return prev; // Return previous state if it's undefined
          });
        }
      } else {
        await api.patch("/api/cart", { coupon: !Clicked, userId: user?._id });
        setClicked(!Clicked);
        setCoupon("");
        setCartItems((prev) => {
          if (prev) {
            return { ...prev, coupon: false }; // Create a new object with updated coupon property
          }
          return prev; // Return previous state if it's undefined
        });
      }
    } else notifyError("No Coupon found with this name");
  };
  const handleQuantityChange = (
    bookId: string | undefined,
    quantity: number
  ) => {
    setCartQuantities((prevQuantities) => {
      const bookIndex = prevQuantities.findIndex(
        (book) => book.bookId === bookId
      );
      const updatedQuantities = [...prevQuantities];
      if (bookIndex !== -1) {
        updatedQuantities[bookIndex] = {
          ...updatedQuantities[bookIndex],
          quantity: quantity,
        };
      }
      return updatedQuantities;
    });
    setLoading(true);
    debounceChangeQuantity(bookId, quantity);
  };
  const debounceChangeQuantity = useDebouncedCallback(
    async (bookId: string, quantity: number) => {
      await handleAddBook(bookId, quantity);
      setLoading(false);
    }
  );
  const getBookQuantity = (bookId: string | undefined) => {
    const book = cartQuantities.find((b) => b.bookId === bookId);
    return book?.quantity || 0; // return 0 or another default value if the book isn't found
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello world");
  };
  return (
    <>
      {loading && (
        <div className="text-center flex justify-center items-center ">
          <ReactLoading type="bubbles" color="#7151ed" />
        </div>
      )}
      {!cartItems && (
        <>
          <h1 className="text-lg mt-12 text-center">No Items</h1>
          <div className="flex justify-center items-center">
            <button className="bg-[#7151ed] border-2border-[#7151ed] w-1/4 mt-4 hover:bg-white  hover:text-[#7151ed] text-white  rounded-md  duration-300   transition-colors p-2   ">
              <Link to={"/"}>Go Shopping</Link>
            </button>{" "}
          </div>
        </>
      )}
      {cartItems && !loading && (
        <div className="container">
          <div className="md:flex ">
            <div className="md:w-3/5 w-full">
              <h1 className="text-xl font-medium mt-4">
                Cart{" "}
                <span className="text-sm font-normal">
                  {" "}
                  ( {cartItems.total} item{cartItems.total > 1 ? "s" : ""} )
                </span>
              </h1>
              {cartItems.books?.map((book) => (
                <div
                  key={book._id}
                  className="bg-white mt-8 p-4 rounded-md flex md:flex-row flex-col md:items-start md:justify-start md:text-start items-center justify-center text-center gap-6  md:gap-12"
                >
                  <Link
                    to={`/Book/${book.bookId}`}
                    className="flex items-center"
                  >
                    <img
                      src={book.image}
                      alt=""
                      width={100}
                      className="rounded-lg "
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between md:flex-row flex-col">
                      <h1 className="text-lg font-medium text-[#7151ed]">
                        {book.name}
                      </h1>
                      <p className="">
                        <span className="font-bold">
                          ${book.price.toFixed(2)}
                        </span>
                      </p>
                    </div>

                    <p className="text-sm mt-3">{book.description}</p>

                    <p className="font-bold mt-4 font-serif">
                      <span className="font-light">Sold by </span>Book Store
                    </p>
                    <div className="flex gap-3 mt-2 justify-between">
                      <div className="flex gap-3">
                        <button className="text-center text-xs  flex items-center hover:text-[#7151ed] transition-colors duration-300 ">
                          <FavoriteIcon
                            color="inherit"
                            className="mr-1"
                            fontSize="small"
                          />
                          <span className="text-sm">Move to Wishlist</span>
                        </button>
                        <button
                          onClick={() => handleCart(book?.bookId, true)}
                          className="text-center text-xs  flex items-center hover:text-[#C40233] transition-colors duration-300 "
                        >
                          <FontAwesomeIcon icon={faTrashCan} fontSize={16} />{" "}
                          <span className="text-sm ml-1">Remove</span>
                        </button>
                      </div>
                      <Select
                        className="w-[55px]"
                        displayEmpty
                        value={getBookQuantity(book.bookId)}
                        onChange={(e) =>
                          handleQuantityChange(
                            book.bookId,
                            Number(e.target.value)
                          )
                        }
                      >
                        {[...Array(10).keys()].map((num) => (
                          <MenuItem key={num + 1} value={num + 1}>
                            {num + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex flex-col mt-4 p-4  rounded-r-md rounded-l-md font-semibold md:w-2/5">
              <div className="flex flex-col border-[#ddd] border p-4 sticky top-4">
                Order Summary
                <form
                  action="submit"
                  onSubmit={handleSubmit}
                  className=" my-2 relative "
                >
                  <input
                    type="text"
                    className={`outline-none rounded-l-md bg-white py-2 md:w-5/6 md:p-2 w-full px-3   ${
                      Clicked ? "text-slate-500" : "text-black"
                    }`}
                    placeholder="Enter the coupon code"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setCoupon(event.target.value)
                    }
                    value={Coupon}
                    disabled={Clicked}
                  />
                  <button
                    type="submit"
                    className="bg-[#7151ed] text-white p-2 rounded-r-md absolute h-full right-[-8px] md:min-w-[80px]"
                    onClick={handleCoupon}
                  >
                    {Clicked ? "Remove" : "Apply"}
                  </button>
                </form>
                <button
                  className=" bg-white fansyHover  w-full p-1 rounded-md relative hover:after:w-full after:w-0 after:transition-all after:duration-300  after:absolute after:h-full after:bg-[#7151ed]  after:rounded-md after:left-0 after:top-0  "
                  onClick={() => setDisplay(!Display)}
                >
                  <div className="text">
                    <span className="transition-all duration-300 delay-150 ">
                      <FontAwesomeIcon
                        icon={faTags}
                        className="pr-2 relative z-[1] "
                      />
                    </span>
                    <span className="text-sm  relative z-[1] transition-all duration-300 delay-150  ">
                      View Available Coupons
                    </span>
                  </div>
                </button>
                <div
                  className={`mt-2 h-0 transition-all duration-300  ${
                    Display ? "h-[10px]" : ""
                  }`}
                >
                  <p
                    className={`text-center text-[#7151ed] transition-all duration-300 ${
                      Display ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="text-black">Use this : </span> Discount
                  </p>
                </div>
                <div className="border-b border-b-gray-400 pb-4">
                  <div className="flex justify-between mt-4">
                    <p className="font-light text-sm tracking-wider">
                      SubTotal ({cartItems.total} items)
                    </p>
                    <p className="font-normal">${total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <p className="font-light text-sm tracking-wider">
                      Discount :
                    </p>
                    <p className="font-normal text-[#7151ed]">
                      $
                      {cartItems.coupon
                        ? (total - total * 0.9).toFixed(2)
                        : total}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <h4 className="text-xl">
                    Total
                    <span className="text-xs font-light">
                      (Inclusive of VAT)
                    </span>
                  </h4>
                  <p>
                    $
                    {Clicked ? `${(total * 0.9).toFixed(2)}` : total.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-[#7151ed] border-2 loginBtn  border-[#7151ed] hover:bg-white  hover:text-[#7151ed] text-white  rounded-md  duration-300   transition-colors p-2  w-full mt-4 "
                >
                  <span className="relative z-[1000]"> Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
