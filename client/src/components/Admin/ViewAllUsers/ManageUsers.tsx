import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User } from "../../../contexts/Auth";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

interface Users {
  users: User[];
  number: number;
}
const ManageUsers = () => {
  const [Users, setUsers] = useState<Users | undefined>();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setloading(!loading);
      try {
        const { data } = await api.get("/api/auth/getUsers", {
          withCredentials: true,
        });
        setUsers(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(!loading);
      }
    };
    getUsers();
  }, []);
  const handleDeleteUser: (id: number) => Promise<void> = async (
    id: number
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
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/auth/deleteUser/${id}`, {
            withCredentials: true,
          });
          Swal.fire({
            title: "Deleted!",
            text: "Account has been deleted.",
            icon: "success",
          });
          setUsers((prevUsers) => {
            if (!prevUsers) return prevUsers;
            return {
              ...prevUsers,
              users: prevUsers.users.filter((user) => user._id !== id),
            };
          });
        } catch (error) {
          Swal.fire({
            title: "Error Happened!",
            text: "Failed to delete Account",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <ClipLoader loading={loading && !Users?.users.length} color="#7151ed" />
      </div>
      {Users?.users && (
        <div className="container mt-8">
          <TableContainer component={Paper} className="sm:w-1/6 md:w-full">
            <Table sx={{ minWidth: 150 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Users?.users?.map((user: User) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <p>{user.userName}</p>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
