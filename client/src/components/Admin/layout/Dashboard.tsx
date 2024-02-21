import React, { useState } from "react";
import { useAuth } from "../../../contexts/Auth";
import "./dashboard.scss";
import { Add, ChevronRight, Delete } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.scss";
import { LeftArrow } from "./Icons/LeftArrow";
import { RightArrow } from "./Icons/RightArrow";
import { Edit } from "./Icons/Edit";
import { View } from "./Icons/View";
import { Users } from "./Icons/Users";
import { Hamburger } from "./Icons/Hamburger";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { ExpandMore } from "@material-ui/icons";
import MobileSideBar from "./MobileSideBar";

const Dashboard: React.FC<{ name?: string; children?: React.ReactNode }> = (
  props
) => {
  const { user } = useAuth();
  const [Collapse, setCollapse] = useState(false);
  const [Menu, setMenu] = useState(false);
  const { name, children } = props;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <>
      <div className="flex">
        <MobileSideBar Menu={Menu} setMenu={setMenu} />
        <aside
          className={` bg-[#fcfaf5] h-screen sticky top-0 p-2 min-w-[55px] dashboard-sidebar md:block hidden ${
            Collapse ? "w-[5.33333333%]" : "w-1/5"
          }`}
        >
          <div className="flex flex-col justify-between h-full relative ">
            <div>
              <div
                className={`flex mt-2 flex-1 ${
                  Collapse ? "justify-start" : "justify-end"
                } mr-3`}
              >
                {Collapse ? (
                  <RightArrow
                    className="flex-shrink-0 w-8 h-8 cursor-pointer"
                    onClick={() => setCollapse(!Collapse)}
                  />
                ) : (
                  <LeftArrow
                    className="flex-shrink-0 w-8 h-8 cursor-pointer"
                    onClick={() => setCollapse(!Collapse)}
                  />
                )}
              </div>
              <Link
                to={"/dashboard/viewAllBooks"}
                className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
              >
                <View className="flex-shrink-0 w-6 h-6 cursor-pointer" />
                <p className={`${Collapse ? "invisible" : ""} `}>
                  View All Books
                </p>
              </Link>
              <Link
                to={"/dashboard/addbook"}
                className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
              >
                <Add />
                <p className={`${Collapse ? "invisible" : ""} `}>Add Book</p>
              </Link>

              <Link
                to={"/dashboard/deletebook"}
                className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
              >
                <Delete />
                <p className={`${Collapse ? "invisible" : ""} `}>Delete Book</p>
              </Link>
              <Link
                to={"/dashboard/modifybook"}
                className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
              >
                <Edit className="flex-shrink-0 w-6 h-6 cursor-pointer" />
                <p className={`${Collapse ? "invisible" : ""} `}>
                  Modify Book{" "}
                </p>
              </Link>
              <Link
                to={"/dashboard/viewAllUsers"}
                className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
              >
                <Users className="flex-shrink-0 w-6 h-6 cursor-pointer" />
                <p className={`${Collapse ? "invisible" : ""} `}>
                  Manage Users{" "}
                </p>
              </Link>
            </div>
            <div className="flex justify-between flex-col gap-4 mt-12 cursor-pointer ">
              <Accordion className={`${Collapse ? "hidden" : ""}`}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex items-center">
                    <p data-letters={`${user?.userName.charAt(0)}`}></p>
                    <p
                      className={`font-medium ${
                        Collapse ? "invisible" : "visible "
                      } transition-all duration-100`}
                    >
                      {" "}
                      {user?.userName.charAt(0).toUpperCase()}
                      {user?.userName.slice(1)}
                    </p>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className={`${Collapse ? "hidden" : "flex gap-3 flex-col"}`}
                  >
                    <button className="bg-[#7151ed] border-2border-[#7151ed] hover:bg-white  hover:text-[#7151ed] text-white  rounded-md  duration-300   transition-colors p-2   ">
                      <Link to={"/"}>Home</Link>
                    </button>{" "}
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </aside>
        <div className="w-full bg-white ">
          <div className=" dashboard-header  text-lg p-2 pt-4 pb-4 items-center flex gap-2 text-gray-500 sticky z-20 top-0 bg-[#fcfaf5] pl-8">
            <Hamburger
              className="md:hidden flex-shrink-0 w-6 h-6 cursor-pointer mr-4"
              onClick={() => setMenu(!Menu)}
            />
            <span className="font-medium ">Dashboard </span>{" "}
            <div className={`${name === "" ? "hidden" : "visible"}`}>
              <ChevronRight />
            </div>
            <span>{name}</span>
          </div>{" "}
          <div className="pl-8 min-h-dvh">
            {children && (children as React.ReactNode)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
