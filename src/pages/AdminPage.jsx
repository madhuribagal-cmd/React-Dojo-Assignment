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
import { employees } from "../data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminPage = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([...employees]);
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
    setTableData((prevData) =>
      prevData.map((row) => (row.id === editedRowData.id ? editedRowData : row))
    );
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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              {editRecordId === emp.id ? (
                <>
                  <TableCell>
                    <input
                      type="text"
                      name="name"
                      value={editedRowData.name}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      name="age"
                      value={editedRowData.age}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      name="position"
                      value={editedRowData.position}
                      onChange={handleChange}
                    />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.age}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                </>
              )}

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
