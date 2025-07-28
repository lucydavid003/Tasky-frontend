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


const FullScreenContainer = styled(Box)(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));


const LeftHalf = styled(Box)(() => ({
  flex: 1,
  background: "linear-gradient(135deg, #8a9ffc 0%, #9b72e6 100%)",
  
}))

const RightHalf = styled(Box)(() => ({
  flex: 1,
  background: "linear-gradient(135deg, #8a9ffc 0%, #9b72e6 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: `''`,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
}));


const BeautifulFormContainer = styled(Box)(() => ({
  width: "100%",
  maxWidth: "450px",
  padding: "48px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(25px)",
  borderRadius: "24px",
  boxShadow: `
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.5)
  `,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  position: "relative",
  "&::before": {
    content: `''`,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "24px",
    padding: "1px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
}));


const ElegantTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      border: "1px solid rgba(138, 159, 252, 0.4)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 35px rgba(138, 159, 252, 0.25)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#8a9ffc",
        borderWidth: "2px",
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

const StunningButton = styled(Button)(() => ({
  borderRadius: "16px",
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: 700,
  textTransform: "none",
  background: "linear-gradient(135deg, #8a9ffc 0%, #9b72e6 100%)",
  boxShadow: `
    0 8px 25px rgba(138, 159, 252, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.15)
  `,
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
    boxShadow: `
      0 15px 35px rgba(138, 159, 252, 0.6),
      0 8px 20px rgba(0, 0, 0, 0.2)
    `,
    background: "linear-gradient(135deg, #7a8efb 0%, #8b62d5 100%)",
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
  "&:disabled": {
    background: "rgba(138, 159, 252, 0.5)",
    transform: "none",
    boxShadow: "none",
  },
}));

const BeautifulAlert = styled(Alert)(() => ({
  borderRadius: "16px",
  backgroundColor: "rgba(244, 67, 54, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(244, 67, 54, 0.2)",
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
    <FullScreenContainer>
      <LeftHalf>
        
      </LeftHalf>
      
      <RightHalf>
        <BeautifulFormContainer>
          <Typography 
            variant="h3" 
            fontWeight={800} 
            gutterBottom
            sx={{
              textAlign: "center",
              background: "linear-gradient(135deg, #8a9ffc 0%, #9b72e6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "40px",
              fontSize: { xs: "2rem", md: "2.5rem" },
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Create Account
          </Typography>
          
          <Stack spacing={3}>
            {formError && (
              <BeautifulAlert severity="error">
                {formError}
              </BeautifulAlert>
            )}
            
            <ElegantTextField
              label="First Name"
              type="text"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            
            <ElegantTextField
              label="Last Name"
              type="text"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            
            <ElegantTextField
              label="Email Address"
              type="email"
              fullWidth
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            
            <ElegantTextField
              label="Username"
              type="text"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            
            <ElegantTextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <ElegantTextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={Confirmpassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            
            <StunningButton
              variant="contained"
              fullWidth
              onClick={handleSignUp}
              disabled={isPending}
              sx={{ mt: 4 }}
            >
              {isPending ? "Creating Account..." : "REGISTER"}
            </StunningButton>
          </Stack>
          
          <Typography 
            textAlign="center" 
            sx={{ 
              color: "rgba(0, 0, 0, 0.6)",
              marginTop: "32px",
              fontSize: "16px"
            }}
          >
            Already have an account?{" "}
            <MuiLink 
              component={Link} 
              to="/login"
              sx={{
                color: "#8a9ffc",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#7a8efb",
                  textDecoration: "underline",
                  textDecorationColor: "#7a8efb",
                },
              }}
            >
              Log In
            </MuiLink>
          </Typography>
        </BeautifulFormContainer>
      </RightHalf>
    </FullScreenContainer>
  );
}

export default Register;