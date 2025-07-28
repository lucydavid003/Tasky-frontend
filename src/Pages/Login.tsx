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
import { styled } from "@mui/material/styles";


const GradientBackground = styled(Box)(() => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
}));


const StyledContainer = styled(Box)(() => ({
  width: "100%",
  maxWidth: 400,
  padding: "32px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  position: "relative",
  zIndex: 1,
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
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
    background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
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
    <GradientBackground>
      <StyledContainer>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          gutterBottom
          sx={{
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 3,
          }}
        >
          Log in
        </Typography>
        <Stack spacing={2}>
          {formError && (
            <StyledAlert severity="error">
              {formError}
            </StyledAlert>
          )}
          <StyledTextField
            label="emailAddress or userName"
            fullWidth
            margin="normal"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <StyledTextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <StyledButton
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? "Logging In..." : "Log In"}
          </StyledButton>
        </Stack>
        <Typography 
          textAlign="center" 
          mt={2}
          sx={{ color: "text.secondary" }}
        >
          Don't have an account?{" "}
          <MuiLink 
            component={Link} 
            to="/register"
            sx={{
              color: "#667eea",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Register
          </MuiLink>
        </Typography>
      </StyledContainer>
    </GradientBackground>
  );
}

export default Login;