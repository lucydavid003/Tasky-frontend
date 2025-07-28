import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
}

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfPassword] = useState("");
  const [formError, setFormError] = useState("");
  const  navigate = useNavigate ();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register -user"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post(
        "http://127.0.0.1:4000/auth/register",
        newUser
      );

      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError (error.response?.data.message);
      }
      else {
setFormError ("something went wrong!")
      }
      
    },
   onSuccess: () => {
    navigate ("/login")
   }
  });

  function handleSignUp() {
    setFormError("");
    if (password !== Confirmpassword) {
      setFormError("password and confirmpassword must match!");
    }
    const newUser = { firstName, lastName, emailAddress, userName, password };

    mutate(newUser);
  }

  return (
    <Box width="100%" maxWidth={400}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Create Account
      </Typography>
      <Stack spacing={2}>
        {formError && <Alert severity="error"> {formError}</Alert>}
        <TextField
          label="firstName"
          type="text"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="lastName"
          type="text"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="emailAddress"
          type="text"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="userName"
          type="text"
          fullWidth
          margin="normal"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <TextField
          label="password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label=" Confirm password"
          type=" Confpassword"
          fullWidth
          margin="normal"
          value={Confirmpassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignUp}
          loading={isPending}
        >
          Register
        </Button>
      </Stack>
      <Typography textAlign="center" mt={2}>
        Already have an account?{" "}
        <MuiLink component={Link} to="/login">
          Log In
        </MuiLink>
      </Typography>
    </Box>
  );
}

export default Register;
