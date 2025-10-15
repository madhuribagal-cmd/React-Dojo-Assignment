import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Validate on blur
  });

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const onSubmit = (data) => {
    const userId = uuidv4();
    console.log("data", data);
    const newUser = { id: userId, ...data };
    console.log("newUser", newUser);
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers"));
    if (existingUsers) {
      existingUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    } else {
      // Store user in array format into localstorage
      localStorage.setItem("registeredUsers", JSON.stringify([newUser]));
    }
    alert("User registered successfully!");
    navigate("/login");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap="20px"
    >
      <Box display="flex" mr={37}>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 4, width: 300 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
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
            defaultValue=""
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
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="mobile"
            control={control}
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select
                  {...field} // Spreads onChange, onBlur, and value to the Select
                  fullWidth
                  label="Role"
                  margin="normal"
                  name="role"
                  error={!!errors.role}
                >
                  <MenuItem key="admin" value="admin">
                    Admin
                  </MenuItem>
                  <MenuItem key="employee" value="employee">
                    Employee
                  </MenuItem>
                </Select>
                <FormHelperText>{errors.role?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
