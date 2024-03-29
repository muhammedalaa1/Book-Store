import { Link, useNavigate } from "react-router-dom";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Badge } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MegaMenu from "./MegaMenu";
import "./navbar.scss";
import Search from "./Search";
import { useEffect, useRef, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import { useAuth } from "../../contexts/Auth";
const Nav = () => {
  const [Button, setButton] = useState(false);
  const [openProfile, setopenProfile] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const profile = useRef<HTMLDivElement>(null);
  const handleMenu = () => {
    setButton((prev) => !prev);
  };
  const handleOutsideClick = (event: MouseEvent) => {
    if (profile.current && !profile.current.contains(event.target as Node)) {
      setopenProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const { cartItems, user } = useAuth();

  return (
    <>
      <header className="font-nunito border-b border-b-[#d4d5d6] ">
        <div className="pt-8">
          <div className="custom-container">
            <div className="row flex md:flex-row flex-col justify-center gap-4 md:mx-12 items-center">
              <div className="md:w-1/2 flex md:justify-start justify-center w-full md:mb-2.5 text-[#888a92]  duration-500 text-base">
                {user ? (
                  <>
                    <div
                      onClick={() => setopenProfile(!openProfile)}
                      ref={profile}
                      className={`${
                        openProfile
                          ? "account-circle uppercase font-semibold "
                          : "cursor-pointer"
                      }`}
                    >
                      <AccountCircle className="mr-4 hover:text-[#7151ed] cursor-pointer transition-all " />
                      {openProfile && (
                        <ul className=" absolute -translate-x-2 bg-[#ddd] p-3 z-50 rounded-lg translate-y-2 ">
                          <li className="mb-3 relative">
                            <PersonIcon />
                            {user.userName}
                          </li>

                          {user.role === "admin" ? (
                            <li className="mb-3 relative flex hover:text-[#7151ed] transition-all cursor-pointer ">
                              <DashboardIcon />

                              <Link to={"/dashboard"} className="flex">
                                {" "}
                                Dashboard
                              </Link>
                            </li>
                          ) : (
                            <></>
                          )}
                          <li className=" hover:text-[#7151ed] transition-all flex">
                            {" "}
                            <LogoutIcon />
                            <button onClick={handleLogout}>Logout</button>
                          </li>
                        </ul>
                      )}{" "}
                    </div>

                    {/* <span className="mr-4">{user.userName}</span> */}
                  </>
                ) : (
                  <Link to={"/login"} className=" hover:text-[#7151ed] mr-5">
                    <span className="">Login/Register</span>
                  </Link>
                )}
                <Link to={"/"} className="hover:text-[#7151ed] mr-5">
                  FAQ
                </Link>
                <Link to={"/"} className="hover:text-[#7151ed] mr-5">
                  Contact Us
                </Link>
              </div>
              <div className=" w-full md:mb-2.5 flex md:justify-end md:mr-12 items-center justify-center">
                <div className="mr-4 pr-6 border-r border-r-gray-300 inline-block text-right pt-1">
                  <div className="flex">
                    <img
                      src="../../.././icon-1.png"
                      className="max-w-[35px] mr-2"
                      alt=""
                    />
                    <div className="">
                      <Link
                        to={"/books"}
                        className="text-[#7151ed] font-medium mr-4 "
                      >
                        <h5 className="font-semibold">Bookshelf</h5>
                      </Link>
                      <span className="float-left font-medium text-xs font-sans">
                        Books
                      </span>
                    </div>
                  </div>
                </div>
                <Link to={"/cart"}>
                  <div className="flex-wrap flex">
                    <div className="mr-4">
                      <Badge
                        badgeContent={cartItems?.total}
                        color="secondary"
                        overlap="rectangle"
                      >
                        <ShoppingCart
                          className="text-[#7151ed] "
                          fontSize="large"
                        />
                      </Badge>
                    </div>
                    <div className="flex-col">
                      <p className="text-[#7151ed] font-semibold">
                        Your Basket
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:mb-1  mb-6 pt-5">
          <div className=" custom-container">
            <div className="md:mx-12 md:flex md:items-center xl:gap-[8rem]  block">
              <div className="w-full md:w-1/3 lg:w-1/4 flex justify-between items-center relative mb-2 ">
                <div className="max-h-[200px] ">
                  <Link to={"/"}>
                    <h6 className="font-croissant text-[#7151ed] duration-500 text-2xl xl:text-4xl md:text-3xl sm:text-3xl  cursor-pointer	">
                      Book Store
                    </h6>
                  </Link>
                </div>
                <button
                  onClick={handleMenu}
                  className="md:hidden block absolute font-semibold right-3 translate-y-[10%] text-[#7151ed]"
                >
                  <MenuIcon className="" />
                  Menu
                </button>
              </div>
              <Search />
            </div>
          </div>
        </div>
        <DesktopMenu />
        <div className={` ${Button ? "active" : "test"}`}>
          <MegaMenu />
        </div>
      </header>
    </>
  );
};

export default Nav;
