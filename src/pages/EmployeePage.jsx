import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";

const EmployeePage = () => {
  const [user, setUser] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Validate on blur
  });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  const navigate = useNavigate();

  const handleSave = (data) => {
    alert("Profile updated successfully!");
    const updateduser = { ...user, ...data };
    localStorage.setItem("user", JSON.stringify(updateduser));
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers"));
    const updatedRegisteredUsers = existingUsers.map((item) =>
      item.id === user.id ? updateduser : item
    );
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedRegisteredUsers)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Edit Profile</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box component="form" onSubmit={handleSubmit(handleSave)} sx={{ mt: 3 }}>
        <Controller
          name="name"
          control={control}
          defaultValue={user.name}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              disabled
              {...field}
              fullWidth
              label="Name"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue={user?.email}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="mobile"
          control={control}
          defaultValue={user?.mobile}
          rules={{
            required: "mobile is required",
            minLength: {
              value: 10,
              message: "mobile must be 10 digits",
            },
            maxLength: {
              value: 10,
              message: "mobile can not be more than 10 digits",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Mobile"
              margin="normal"
              type="mobile"
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue={user?.address}
          rules={{
            required: "Address is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="text"
              label="Address"
              margin="normal"
              name="address"
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          InputProps={{
            readOnly: true,
          }}
          defaultValue={user.role ? user.role : ""}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <Select
              {...field} // Spreads onChange, onBlur, and value to the Select
              fullWidth
              label="Role"
              margin="normal"
              name="role"
              disabled
            >
              <MenuItem key="admin" value="admin">
                Admin
              </MenuItem>
              <MenuItem key="employee" value="employee">
                Employee
              </MenuItem>
            </Select>
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeePage;
