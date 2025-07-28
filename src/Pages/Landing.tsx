import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function Landing() {
  return (
    <Box display="flex" height="100vh" border="7px solid black"  borderRadius="20px" overflow="hidden">
      
      <Box
        flex={1}
        bgcolor="#97e6e8ff"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box textAlign="center" px={4}>
          <Typography variant="h3" fontWeight={600} color="blue" mb={3}     fontFamily={"'Raleway', sans-serif"}>
          TaskAura 
          <Typography variant="h5"  p={3}  fontFamily={"'Nunito', sans-serif"}> Brighten your day, one task at a time</Typography>
           
          </Typography>
          <img
            src="/TASKY.svg"
            alt="Tasks Illustration"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </Box>
      </Box>

      
      <Box
        flex={1}
        bgcolor="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        p={4}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Landing;
