import React, { useState } from "react";
import { useAuth } from "../../../contexts/Auth";
import "./dashboard.scss";
import { useLocation } from "react-router-dom";
import { Add, ChevronRight, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
const Dashboard: React.FC<{ name?: string; children?: React.ReactNode }> = (
	props
) => {
	const { user } = useAuth();
	const [Collapse, setCollapse] = useState(false);
	const location = useLocation();
	console.log(location.search);
	const { name, children } = props;
	console.log(name);

	return (
		<>
			<div className="flex">
				<aside
					className={` bg-[#fcfaf5] min-h-dvh sticky top-0 p-2 min-w-[55px] ${
						Collapse ? "w-[5.33333333%]" : "w-1/4"
					}`}
				>
					<div className="flex items-center">
						<p
							data-letters={`${user?.userName.charAt(0)}`}
							onClick={() => setCollapse(!Collapse)}
							className="cursor-pointer"
						></p>
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
					<Link
						to={"/dashboard/addbook"}
						className="m-2 flex  whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-fit"
					>
						<Add />
						<p className={`${Collapse ? "invisible" : ""} `}>Add Book</p>
					</Link>
					<Link
						to={"/dashboard/deletebook"}
						className="m-2 flex  whitespace-nowrap gap-2 items-center mt-12 overflow-hidden w-fit"
					>
						<Delete />
						<p className={`${Collapse ? "invisible" : ""} `}>Delete Book</p>
					</Link>
				</aside>
				<div className="w-full bg-white">
					<div className="text-lg p-2 pt-4 pb-4 items-center flex gap-2 text-gray-500 sticky top-0 bg-[#fcfaf5] pl-8">
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
