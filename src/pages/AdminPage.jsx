import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminPage = () => {
  const navigate = useNavigate();
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));
  console.log("registeredUsers", registeredUsers);
  const [tableData, setTableData] = useState([...registeredUsers]);
  const [editRecordId, setEditRecordId] = useState(null);
  const [editedRowData, setEditedRowData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editHandler = (emp) => {
    setEditRecordId(emp.id);
    setEditedRowData({ ...emp });
  };

  const saveHandler = () => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (editedRowData.id === loggedUser.id)
      localStorage.setItem("user", JSON.stringify(editedRowData));

    setTableData((prevData) => {
      const updatedData = prevData.map((row) =>
        row.id === editedRowData.id ? editedRowData : row
      );
      console.log("updatedData", updatedData);
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers"));
      const updatedRegisteredUsers = existingUsers.map((item) =>
        item.id === editedRowData.id ? editedRowData : item
      );
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify(updatedRegisteredUsers)
      );
      return updatedData;
    });
    setEditRecordId(null);
  };

  const deleteHandler = (id) => {
    console.log("id", id);
    setTableData((prevData) => prevData.filter((row) => row.id !== id));
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Employee List</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              {editRecordId === emp.id ? (
                <>
                  <TableCell>
                    <input
                      type="email"
                      name="email"
                      value={editedRowData.email}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      name="mobile"
                      value={editedRowData.mobile}
                      onChange={handleChange}
                    />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.mobile}</TableCell>
                </>
              )}
              <TableCell>{emp.role}</TableCell>

              <TableCell>
                {editRecordId === emp.id ? (
                  <IconButton onClick={() => saveHandler()}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => editHandler(emp)}>
                    <ModeEditIcon />
                  </IconButton>
                )}

                <IconButton onClick={() => deleteHandler(emp.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminPage;
