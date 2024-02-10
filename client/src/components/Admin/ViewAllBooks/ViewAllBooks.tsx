import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../../contexts/Auth";
import { Sort } from "../layout/Icons/Sort";
import { Link } from "react-router-dom";

const ViewAllBooks = () => {
  const { AllBooks } = useAuth();
  const [sortedBooks, setSortedBooks] = useState([...AllBooks]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const sortBooks = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sorted = [...AllBooks].sort((a, b) => {
      if (key === "name") {
        return a.name.localeCompare(b.name);
      } else if (key === "price") {
        return a.price - b.price;
      } else if (key === "quantity") {
        return a.quantity - b.quantity;
      }
      return 0;
    });

    if (direction === "descending") {
      sorted.reverse();
    }

    setSortedBooks(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mt-8">
      <TableContainer component={Paper} className="sm:w-1/6 md:w-full">
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="md:w-1/2 w-1/5">
                {" "}
                <div className="flex items-center">
                  <p>Book Name </p>
                  <div>
                    <Sort
                      className="cursor-pointer"
                      onClick={() => sortBooks("name")}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>Author Name</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <p>Price </p>
                  <div>
                    <Sort
                      className="cursor-pointer"
                      onClick={() => sortBooks("price")}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <p>Quantity </p>
                  <div>
                    <Sort
                      className="cursor-pointer"
                      onClick={() => sortBooks("quantity")}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBooks.map((book) => (
              <TableRow
                key={book.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="w-1/3">
                  <Link to={`/Book/${book._id}`}>
                    <div className="flex items-center gap-4 justify-between">
                      <div className="flex items-center w-1/2 gap-4">
                        <img
                          src={book.image}
                          alt=""
                          loading="lazy"
                          className="w-1/4"
                        />
                        <p className="text-lg font-semibold  text-[#7151ed]">
                          {book.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{book?.author} </TableCell>
                <TableCell>{book?.publisher}</TableCell>
                <TableCell>${book?.price?.toFixed(2)}</TableCell>
                <TableCell>{book.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewAllBooks;
