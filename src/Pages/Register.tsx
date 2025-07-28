import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../api/axios";
import { styled } from "@mui/material/styles";


const GradientBackground = styled(Box)(() => ({
  background: "linear-gradient(135deg, #8a9ffc 0%, #9b72e6 100%)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end", 
  padding: "20px",
}));


const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "50vw", 
  padding: "40px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  [theme.breakpoints.down("sm")]: { 
    maxWidth: "100%",
  },
}));


const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      transform: "translateY(-1px)",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#667eea",
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#667eea",
    },
  },
}));


const StyledButton = styled(Button)(() => ({
  borderRadius: "12px",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(135deg, #8a9ffc 0%, #9b72e6 100%)",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
    background: "linear-gradient(135deg, #7a8efb 0%, #8b62d5 100%)", 
  },
  "&:disabled": {
    background: "rgba(102, 126, 234, 0.5)",
    transform: "none",
    boxShadow: "none",
  },
}));


const StyledAlert = styled(Alert)(() => ({
  borderRadius: "12px",
  "& .MuiAlert-icon": {
    alignItems: "center",
  },
}));

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
  const navigate = useNavigate();

  
  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axiosInstance.post("auth/register", newUser);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message);
      } else {
        setFormError("something went wrong!");
      }
    },
    onSuccess: () => {
      navigate("/login");
    }
  });

  
  function handleSignUp() {
    setFormError("");
    if (password !== Confirmpassword) {
      setFormError("password and confirmpassword must match!");
      return;
    }
    const newUser = { firstName, lastName, emailAddress, userName, password };
    mutate(newUser);
  }

  return (
    <GradientBackground>
      <FormContainer>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          gutterBottom
          sx={{
            textAlign: "center",
            background: "linear-gradient(135deg, #8a9ffc 0%, #9b72e6 100%)", // Brighter shades
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "32px",
          }}
        >
          Create Account
        </Typography>
        
        <Stack spacing={3}>
          {formError && (
            <StyledAlert severity="error">
              {formError}
            </StyledAlert>
          )}
          
          <StyledTextField
            label="First Name"
            type="text"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          
          <StyledTextField
            label="Last Name"
            type="text"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          
          <StyledTextField
            label="Email Address"
            type="email"
            fullWidth
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          
          <StyledTextField
            label="Username"
            type="text"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          
          <StyledTextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <StyledTextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={Confirmpassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleSignUp}
            disabled={isPending}
            sx={{ mt: 3 }}
          >
            {isPending ? "Creating Account..." : "REGISTER"}
          </StyledButton>
        </Stack>
        
        <Typography 
          textAlign="center" 
          sx={{ 
            color: "text.secondary",
            marginTop: "24px"
          }}
        >
          Already have an account?{" "}
          <MuiLink 
            component={Link} 
            to="/login"
            sx={{
              color: "#667eea",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Log In
          </MuiLink>
        </Typography>
      </FormContainer>
    </GradientBackground>
  );
}

export default Register;