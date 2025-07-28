import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Avatar,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const { data: user = {
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
  } } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/me");
      return res.data;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: User) =>
      axiosInstance.patch("/users", updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alert("User info updated.");
    },
    onError: () => alert("Update failed."),
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (passwords: { currentPassword: string; newPassword: string }) =>
      axiosInstance.patch("/users/password", passwords),
    onSuccess: () => alert("Password updated!"),
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Password update failed.");
    },
  });

  const handleUserUpdate = () => updateUserMutation.mutate(user);
  const handlePasswordUpdate = () => updatePasswordMutation.mutate(passwordData);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  const getInitials = () => {
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", bgcolor: "white" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80, fontSize: 32 }}>
            {getInitials()}
          </Avatar>
          <Typography variant="h5" mt={2}>
            My Profile
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Update Personal Information</Typography>
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          <TextField
            label="First Name"
            value={user.firstName}
            onChange={(e) =>
              queryClient.setQueryData(["user"], {
                ...user,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            label="Last Name"
            value={user.lastName}
            onChange={(e) =>
              queryClient.setQueryData(["user"], {
                ...user,
                lastName: e.target.value,
              })
            }
          />
          <TextField
            label="Username"
            value={user.userName}
            onChange={(e) =>
              queryClient.setQueryData(["user"], {
                ...user,
                userName: e.target.value,
              })
            }
          />
          <TextField
            label="Email"
            value={user.emailAddress}
            onChange={(e) =>
              queryClient.setQueryData(["user"], {
                ...user,
                emailAddress: e.target.value,
              })
            }
          />
          <Button variant="contained" onClick={handleUserUpdate}>
            Update Info
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Update Password</Typography>
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          <TextField
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
          />
          <TextField
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
          />
          <Button variant="contained" onClick={handlePasswordUpdate}>
            Update Password
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Log Out
        </Button>
      </Paper>
    </Container>
  );
}

export default Profile;
