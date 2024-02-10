import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../../contexts/Auth";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import api from "../../../utils/api";

const DeleteBook = () => {
  const { AllBooks, setAllBooks } = useAuth();

  const handleDeleteBook: (bookId: string) => Promise<void> = async (
    bookId
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      const { status } = await api.delete(`/api/books/${bookId}`, {
        withCredentials: true,
      });

      if (result.isConfirmed && status == 204) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Book has been deleted.",
          icon: "success",
        });
        setAllBooks((oldBooks) =>
          [...oldBooks].filter((d) => d._id !== bookId)
        );
      } else {
        Swal.fire({
          title: "Error Happened!",
          text: "Failed to delete Book",
          icon: "error",
        });
      }
    });
  };

  return (
    <>
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
                          onClick={() => handleDeleteBook(book._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${book?.price?.toFixed(2)}</TableCell>
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
