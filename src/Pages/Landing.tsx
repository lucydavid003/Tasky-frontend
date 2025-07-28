import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Avatar, Fade, Slide } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Person, CheckCircle } from '@mui/icons-material';


const AnimatedTaskBoardIllustration: React.FC = () => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      height: '300px', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      borderRadius: 3,
      overflow: 'hidden',
    }}
  >
    
    <Fade in timeout={1000}>
      <Card
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 180,
          transform: 'rotate(-5deg)',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'rotate(-5deg) translateY(0px)' },
            '50%': { transform: 'rotate(-5deg) translateY(-10px)' },
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip label="In Progress" color="primary" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Design new dashboard
          </Typography>
        </CardContent>
      </Card>
    </Fade>

    <Fade in timeout={1500}>
      <Card
        sx={{
          position: 'absolute',
          top: '35%',
          right: '15%',
          width: 160,
          transform: 'rotate(8deg)',
          animation: 'float 3s ease-in-out infinite 1s',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip label="Completed" color="secondary" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            User research
          </Typography>
          <CheckCircle color="secondary" sx={{ mt: 1, fontSize: 20 }} />
        </CardContent>
      </Card>
    </Fade>

    <Fade in timeout={2000}>
      <Card
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: 140,
          transform: 'rotate(3deg)',
          animation: 'float 3s ease-in-out infinite 2s',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip label="Review" color="warning" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            API Documentation
          </Typography>
        </CardContent>
      </Card>
    </Fade>

  
    <Avatar
      sx={{
        width: 70,
        height: 70,
        bgcolor: 'white',
        color: 'primary.main',
        fontSize: '1.8rem',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Person fontSize="large" />
    </Avatar>
  </Box>
);

function Landing() {
  return (
    <Box display="flex" height="100vh" border="7px solid black" borderRadius="20px" overflow="hidden">
      
      <Box
        flex={1}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Modern gradient
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          color: 'white',
          position: 'relative',
        }}
      >
        <Slide direction="right" in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4, zIndex: 2 }}>
            <Typography
              variant="h3"
              fontWeight={600}
              sx={{
                mb: 2,
                background: 'linear-gradient(45deg, #FFF 30%, #E3F2FD 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
              }}
            >
              TaskAura 
            </Typography>
            <Typography variant="h5" p={3} sx={{ opacity: 0.9, fontWeight: 400 }}>
              Brighten your day, one task at a time
            </Typography>
          </Box>
        </Slide>

        <Slide direction="up" in timeout={1200}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <AnimatedTaskBoardIllustration />
          </Box>
        </Slide>
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




