import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmployeePage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const [name, setName] = useState(user.usename);
  const [position, setPosition] = useState("Software Engineer");
  const navigate = useNavigate();

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Edit Profile</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box mt={3} maxWidth={400}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeePage;
