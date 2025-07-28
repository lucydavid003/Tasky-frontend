import {
  Stack,
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";
import useUser from "../Store/userStore";

interface LoginDetails {
  identifier: string;
  password: string;
}

function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login user"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post("/auth/login", loginDetails);
      console.log(response.data);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("something went wrong");
      }
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/dashboard/tasks");
    },
  });

  function handleLogin() {
    mutate({ identifier, password });
    setFormError("");
  }

  return (
    <Box width="100%" maxWidth={400}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Log in
      </Typography>
      <Stack spacing={2}>
        {formError && <Alert severity="error"> {formError}</Alert>}
        <TextField
          label="emailAddress or userName"
          fullWidth
          margin="normal"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
          loading={isPending}
        >
          Log In
        </Button>
      </Stack>
      <Typography textAlign="center" mt={2}>
        Don't have an account?{" "}
        <MuiLink component={Link} to="/register">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
}

export default Login;
