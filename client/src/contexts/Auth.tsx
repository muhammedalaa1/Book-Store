import React, {
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
  role: string;
  phone: string;
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
  css: { font?: number; boxShadowValue?: string }[];
}
export interface Cart {
  userId?: number;
  total: number;
  books?: Book[];
  coupon: boolean;
}

export const AuthContext = createContext<{
  user: User | undefined;
  AllBooks: Book[];
  FeaturedBooks: Book[];
  cartItems: Cart | undefined;
  setCartItems: React.Dispatch<React.SetStateAction<Cart | undefined>>;
  handleAddBook: (bookId: string | undefined, quantity?: number) => void;
  handleCart: (bookId: string | undefined, del?: boolean) => void;
  logout: () => void;
  login: (email: string, password: string) => void;
  getCart: () => void;
  notifyLogin: (msg: string) => void;
  notifyError: (msg: string) => void;
  notifyAdd: (msg: string, img: string | null) => void;
  signUp: (
    userName: string,
    password: string,
    phone: string,
    email: string
  ) => Promise<any>;

  setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}>(null as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [fetched, setFetched] = useState<boolean>(false);
  const [AllBooks, setAllBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState<number>(0);

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
      } catch {
        console.log("error");
      } finally {
        setFetched(true);
      }
    };
    const getAllBooks = async () => {
      try {
        const { data } = await api.get("/api/books");
        setAllBooks(data);
      } catch (error: any) {
        if (error.response.status == "429") {
          notifyError("Time out Stop spamming !");
        } else {
          notifyError("Error Getting  Books");
        }
      }
    };
    const getFeatured = async () => {
      try {
        const { data } = await api.get(`/api/books/?flag=featured`);
        setFeaturedBooks(data);
      } catch (error) {
        notifyError("Error Getting Featured Book");
      }
    };

    getFeatured();
    getAllBooks();
    checkUser();
    console.log("meow");
  }, []);

  useLayoutEffect(() => {
    if (user) {
      getCart();
    }
    console.log("meow2");
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
  const notifyAdd = (msg: string, img: string | null) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      icon: () => (img ? <img src={img} /> : null),
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
        notifyAdd,
        FeaturedBooks,
        cartItems,
        getCart,
        handleAddBook,
        handleCart,
        notifyLogin,
        setAllBooks,
        total,
        setTotal,
        setCartItems,
      }}
    >
      {fetched ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const authenticated = () => useAuth().user != null;
