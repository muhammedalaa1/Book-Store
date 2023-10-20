import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import useDebouncedCallback from "../../hooks/useDebounce";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import { Book } from "../../contexts/Auth";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import { useState } from "react";
const Cart = () => {
  const { cartItems, handleCart, handleAddBook } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cartQuantities, setCartQuantities] = useState<Book[]>([]);

  useEffect(() => {
    setCartQuantities(() => cartItems?.books || []);
  }, [cartItems]);

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
  return (
    <>
      {loading && (
        <div className="text-center flex justify-center items-center ">
          <ReactLoading type="bubbles" color="#7151ed" />
        </div>
      )}
      {cartItems && !loading && (
        <div className="custom-container">
          <div className="md:flex ">
            <div className="md:w-3/4 w-full">
              <h1 className="text-xl font-medium">
                Cart{" "}
                <span className="text-sm font-normal">
                  {" "}
                  ( {cartItems.total} item{cartItems.total > 1 ? "s" : ""} )
                </span>
              </h1>
              {cartItems.books?.map((book) => (
                <div
                  key={book._id}
                  className="bg-white mt-8 p-4 rounded-md flex gap-12"
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
                    <div className="flex justify-between">
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
                          onClick={() =>
                            handleCart(book?.bookId, book.quantity, true)
                          }
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
            <div className="flex-1 mt-4 ml-6 p-3 border-[#ddd] border rounded-r-md rounded-l-md font-semibold">
              Order Summary
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
