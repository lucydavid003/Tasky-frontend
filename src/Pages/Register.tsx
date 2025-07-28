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


const FormContainer = styled(Box)(() => ({
  width: "100%",
  maxWidth: "400px",
  padding: "40px",
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(31, 38, 135, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 40px rgba(31, 38, 135, 0.3)",
  },
}));


const ModernTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "rgba(248, 250, 252, 0.9)",
    border: "2px solid rgba(138, 159, 252, 0.1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: "rgba(248, 250, 252, 1)",
      border: "2px solid rgba(138, 159, 252, 0.3)",
      transform: "translateY(-1px)",
      boxShadow: "0 8px 25px rgba(138, 159, 252, 0.15)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "2px solid #8a9ffc",
      transform: "translateY(-1px)",
      boxShadow: "0 12px 35px rgba(138, 159, 252, 0.25)",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.7)",
    "&.Mui-focused": {
      color: "#8a9ffc",
      fontWeight: 600,
    },
  },
}));


const PremiumButton = styled(Button)(() => ({
  borderRadius: "16px",
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: 700,
  textTransform: "none",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: `''`,
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    transition: "left 0.6s",
  },
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 15px 35px rgba(102, 126, 234, 0.6), 0 8px 20px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
  "&:disabled": {
    background: "rgba(102, 126, 234, 0.5)",
    transform: "none",
    boxShadow: "none",
  },
}));


const EnhancedAlert = styled(Alert)(() => ({
  borderRadius: "16px",
  backgroundColor: "rgba(244, 67, 54, 0.08)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(244, 67, 54, 0.2)",
  "& .MuiAlert-icon": {
    alignItems: "center",
  },
  "& .MuiAlert-message": {
    fontWeight: 500,
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
    <Box width="100%" maxWidth={400}>
      <FormContainer>
        <Typography 
          variant="h4" 
          fontWeight={800} 
          gutterBottom
          sx={{
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "40px",
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            letterSpacing: "-0.02em",
          }}
        >
          Create Account
        </Typography>
        
        <Stack spacing={3}>
          {formError && (
            <EnhancedAlert severity="error">
              {formError}
            </EnhancedAlert>
          )}
          
          <ModernTextField
            label="firstName"
            type="text"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          
          <ModernTextField
            label="lastName"
            type="text"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          
          <ModernTextField
            label="emailAddress"
            type="email"
            fullWidth
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          
          <ModernTextField
            label="userName"
            type="text"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          
          <ModernTextField
            label="password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ModernTextField
            label="Confirm password"
            type="password"
            fullWidth
            value={Confirmpassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          
          <PremiumButton
            variant="contained"
            fullWidth
            onClick={handleSignUp}
            disabled={isPending}
            sx={{ mt: 4 }}
          >
            {isPending ? "Creating Account..." : "REGISTER"}
          </PremiumButton>
        </Stack>
        
        <Typography 
          textAlign="center" 
          sx={{ 
            color: "rgba(0, 0, 0, 0.6)",
            marginTop: "32px",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Already have an account?{" "}
          <MuiLink 
            component={Link} 
            to="/login"
            sx={{
              color: "#667eea",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#5a6fd8",
                textDecoration: "underline",
                textDecorationColor: "#5a6fd8",
              },
            }}
          >
            Log In
          </MuiLink>
        </Typography>
      </FormContainer>
    </Box>
  );
}

export default Register;