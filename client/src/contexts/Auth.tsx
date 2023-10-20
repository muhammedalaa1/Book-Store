import {
  useContext,
  createContext,
  type ReactNode,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

export interface User {
  email: string;
  userName: string;
  _id: number;
}
export interface Book {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  author: string;
  publisher: string;
  image: string;
  description: string;
  bookId?: string;
}
export interface Cart {
  userId?: number;
  total: number;
  books?: Book[];
}

export const AuthContext = createContext<{
  user: User | undefined;
  AllBooks: Book[];
  FeaturedBooks: Book[];
  cartItems: Cart | undefined;
  handleAddBook: (bookId: string | undefined, quantity?: number) => void;
  handleCart: (bookId: string | undefined, del?: boolean) => void;
  logout: () => void;
  login: (email: string, password: string) => void;
  getCart: () => void;
  notifyError: (msg: string) => void;
  signUp: (
    userName: string,
    password: string,
    phone: string,
    email: string
  ) => Promise<any>;
}>(null as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [fetched, setFetched] = useState<boolean>(false);
  const [AllBooks, setAllBooks] = useState<Book[]>([]);
  const [FeaturedBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [cartItems, setCartItems] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await api.get("/api/auth", { withCredentials: true });
        if (typeof data === "object") {
          setUser(data);
          console.log(data);
        }
      } finally {
        setFetched(true);
      }
    };
    const getAllBooks = async () => {
      try {
        const { data } = await api.get("/api/books");
        setAllBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    const getFeatured = async () => {
      try {
        const { data } = await api.get(`/api/books/?flag=t`);
        setFeaturedBooks(data);
      } catch (error) {
        notifyError("Error Getting Featured Book");
      }
    };

    getFeatured();
    getAllBooks();
    checkUser();
  }, []);
  useLayoutEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  const getCart = async () => {
    if (!user?._id) {
      console.warn("User ID is not available yet.");
      return;
    }
    try {
      const { data } = await api.get(`/api/cart?userId=${user._id}`);
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const notifyError = (msg: string) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  const notifyLogin = (msg: string) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  const notifyAdd = (msg: string, img: string) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      icon: () => <img src={img} />,
    });
  const notifyRemoved = (msg: string) =>
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  const logout = async () => {
    try {
      await api.get("/api/auth/logout", {
        withCredentials: true,
      });
    } finally {
      setCartItems(undefined);
      setUser(undefined);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      setUser(data);
      getCart();
      notifyLogin("Welcome " + data.userName);
    } catch (error: any) {
      notifyError(error.response.data.message);
    }
  };

  const signUp = async (
    userName: string,
    email: string,
    password: string,
    phone: string
  ) => {
    try {
      const { data } = await api.post(
        "/api/auth/register",
        {
          userName,
          email,
          password,
          phone,
        },
        {
          withCredentials: true,
        }
      );
      notifyLogin("Registered Successfully");
      console.log(data);
      setUser(data);
    } catch (error: any) {
      if (error.response.status == "500") {
        notifyError("Please enter a valid phone number");
      } else {
        notifyError(error.response.data.message);
      }
      throw error;
    }
  };

  const handleAddBook = async (
    bookId: string | undefined,
    quantity: number = 1
  ) => {
    try {
      const { data } = await api.post(`/api/cart`, {
        userId: user?._id,
        bookId: bookId,
        quantity: quantity,
      });
      console.log(data);
      getCart();
      if (bookId) {
        const matchingBook = AllBooks.find((b) => b._id === bookId);
        const imageUrl = matchingBook?.image || "";

        notifyAdd("Added Successfully", imageUrl);
      }
    } catch (error) {
      console.log(error);
      if (!user) notifyError("Please Login first");
      else notifyError("Unexpected Error Try again ");
    }
  };
  const handleCart = async (
    bookId: string | undefined,

    del: boolean = false
  ) => {
    try {
      await api.put(`/api/cart/${del ? "?delete=true" : ""}`, {
        userId: user?._id,
        bookId: bookId,
      });
      await getCart();
      notifyRemoved("Removed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        AllBooks,
        logout,
        login,
        signUp,
        notifyError,
        FeaturedBooks,
        cartItems,
        getCart,
        handleAddBook,
        handleCart,
      }}
    >
      {fetched ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const authenticated = () => useAuth().user != null;
