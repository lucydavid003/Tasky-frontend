import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Button } from "@mui/material";
import {  Outlet, useNavigate } from "react-router-dom";
import useUser from "../Store/userStore";

function Dashboard() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Box sx={{ bgcolor: "#e0f7fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">TaskAura</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button color="inherit" onClick={() => navigate("new-task")}>New Task</Button>
            <Button color="inherit" onClick={() => navigate("tasks")}>Tasks</Button>
            <Button color="inherit" onClick={() => navigate("completed")}>Completed</Button>
            <Button color="inherit" onClick={() => navigate("trash")}>Trash</Button>
            <Button color="inherit" onClick={() => navigate("profile")}>Profile</Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton>
                <Avatar>{getInitials(user?.firstName || "U")}</Avatar>
              </IconButton>
              <Typography variant="subtitle1">
                Welcome, {user?.firstName}
              </Typography>
            </Box>

            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4, flexGrow: 1 }}>
       <Outlet/>
      </Box>

      <Box>
        <Typography variant="h1">
          
          
        </Typography>
      </Box>
    </Box>
    

    
  );
}

export default Dashboard;
