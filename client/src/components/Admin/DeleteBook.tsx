import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../contexts/Auth";
import { Button } from "@mui/material";
const DeleteBook = () => {
	const { AllBooks, setOpenDialog, OpenDialog } = useAuth();

	const handleDeleteBook: () => Promise<void> = async () => {};

	return (
		<>
			{" "}
			<div className="container mt-12 ">
				<TableContainer component={Paper} className="sm:w-1/6 md:w-full">
					<Table sx={{ minWidth: 150 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Book Name</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Quantity</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{AllBooks.map((book) => (
								<TableRow
									key={book.name}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell className="w-2/3">
										<div className="flex items-center gap-4 justify-between">
											<div
												className="flex items-center w-1/2 gap-4
											"
											>
												<img
													src={book.image}
													alt=""
													loading="lazy"
													className="w-1/4"
												/>
												<p className="text-lg font-semibold text-[#7151ed]">
													{book.name}
												</p>
											</div>
											<div>
												<Button
													variant="contained"
													color="error"
													className="text-right"
												>
													Delete
												</Button>
											</div>
										</div>
									</TableCell>
									<TableCell>${book.price.toFixed(2)}</TableCell>
									<TableCell>{book.quantity}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
};

export default DeleteBook;
