import { Delete, ExpandMore } from "@material-ui/icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "./Icons/Users";
import { Edit } from "./Icons/Edit";
import { Add } from "./Icons/Add";
import { View } from "./Icons/View";
import { useAuth } from "../../../contexts/Auth";

const MobileSideBar: React.FC<{
  Menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ Menu, setMenu }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className={` opened ${Menu ? "active" : ""}`}>
      <div className="flex flex-col justify-between h-full  relative ">
        <div className="flex flex-col pl-4 items-center">
          <Link
            onClick={() => setMenu(!Menu)}
            to={"/dashboard/viewAllBooks"}
            className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
          >
            <View className="flex-shrink-0 w-6 h-6 cursor-pointer" />
            <p>View All Books</p>
          </Link>
          <Link
            onClick={() => setMenu(!Menu)}
            to={"/dashboard/addbook"}
            className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
          >
            <Add />
            <p>Add Book</p>
          </Link>

          <Link
            onClick={() => setMenu(!Menu)}
            to={"/dashboard/deletebook"}
            className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
          >
            <Delete />
            <p>Delete Book</p>
          </Link>
          <Link
            onClick={() => setMenu(!Menu)}
            to={"/dashboard/modifybook"}
            className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
          >
            <Edit className="flex-shrink-0 w-6 h-6 cursor-pointer" />
            <p>Modify Book </p>
          </Link>
          <Link
            onClick={() => setMenu(!Menu)}
            to={"/dashboard/viewAllUsers"}
            className="hover:text-gray-400 transition-all duration-300 flex whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-full"
          >
            <Users className="flex-shrink-0 w-6 h-6 cursor-pointer" />
            <p>Manage Users </p>
          </Link>
        </div>
        <div className="flex justify-between flex-col gap-4 mt-12 cursor-pointer absolute bottom-0 w-full z-50 ">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <div className="flex items-center">
                <p data-letters={`${user?.userName.charAt(0)}`}></p>
                <p
                  className={`font-medium  visible 
                  transition-all duration-100`}
                >
                  {" "}
                  {user?.userName.charAt(0).toUpperCase()}
                  {user?.userName.slice(1)}
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={`flex gap-4`}>
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
    </div>
  );
};

export default MobileSideBar;
