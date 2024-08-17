// 'use client';

// import React from 'react';
// import { SignIn } from "@clerk/nextjs";
// import { 
//   Box, 
//   Container, 
//   Paper, 
//   Typography, 
//   ThemeProvider, 
//   createTheme,
//   useMediaQuery,
//   CssBaseline
// } from '@mui/material';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     background: {
//       default: '#f4f6f8',
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h4: {
//       fontWeight: 700,
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
// });

// export default function SignInPage() {
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           backgroundColor: 'background.default',
//         }}
//       >
//         <Container component="main" maxWidth="sm">
//           <Box
//             sx={{
//               marginTop: 8,
//               marginBottom: 8,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Paper 
//               elevation={3} 
//               sx={{ 
//                 display: 'flex',
//                 flexDirection: 'column',
//                 p: 4, 
//                 width: '100%', 
//                 borderRadius: 2,
//                 boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//                 <img 
//                         src='/logo.png'
//                         style={{mt: 0}}/>
//                 <Typography component="h1" variant="h4" color="primary">
//                   AceCardz
//                 </Typography>
//               </Box>
//               {/* <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
//                 Login in to your account
//               </Typography> */}
//               <SignIn
//                 appearance={{
//                   elements: {
//                     formButtonPrimary: 
//                       'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
//                     card: 'shadow-none',
//                     headerTitle: 'hidden',
//                     headerSubtitle: 'hidden',
//                     socialButtonsBlockButton: 
//                       'border-2 border-gray-300 text-gray-600 hover:bg-gray-100',
//                     formFieldInput: 
//                       'border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500',
//                     footerActionLink: 'text-blue-600 hover:text-blue-700',
//                     formFieldLabel: 'text-gray-700',
//                     dividerLine: 'bg-gray-300',
//                     dividerText: 'text-gray-500',
//                   },
//                   layout: {
//                     socialButtonsPlacement: isMobile ? 'bottom' : 'top',
//                     socialButtonsVariant: 'iconButton',
//                   },
//                 }}
//               />
//             </Paper>
//           </Box>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// }
'use client';

import React from 'react';
import { SignIn } from "@clerk/nextjs";
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  ThemeProvider, 
  createTheme,
  useMediaQuery,
  CssBaseline,
  Grid,
  Stack,
  IconButton
} from '@mui/material';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      },
    },
  },
});

export default function SignInPage() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const back = () => {
    router.push('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(45deg, #121212 30%, #212121 90%)',
        }}
      >
        <Box sx={{mt: 3, ml: 10}}>
          <IconButton>
            <ArrowBackIosIcon onClick={back} fontSize='large' />
          </IconButton>        
        </Box>
        <Container component="main" maxWidth="sm">
          
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Paper 
              elevation={3} 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                p: 4, 
                width: '100%', 
                background: 'rgba(255, 255, 255, 0.05)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <img 
                  src='/logo.png'
                  style={{marginRight: '10px', height: '40px'}}
                  alt="AceCardz Logo"
                />
                <Typography component="h1" variant="h4" sx={{
                  background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  AceCardz
                </Typography>
              </Box>
              <SignIn
                appearance={{
                  elements: {
                    formButtonPrimary: 
                      'bg-cyan-600 hover:bg-cyan-700 text-sm normal-case',
                    card: 'shadow-none bg-transparent',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtonsBlockButton: 
                      'border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-900',
                    formFieldInput: 
                      'border-2 border-cyan-300 focus:border-cyan-500 focus:ring-cyan-500 bg-gray-800 text-white',
                    footerActionLink: 'text-cyan-400 hover:text-cyan-300',
                    formFieldLabel: 'text-cyan-300',
                    dividerLine: 'bg-cyan-700',
                    dividerText: 'text-cyan-300',
                  },
                  layout: {
                    socialButtonsPlacement: isMobile ? 'bottom' : 'top',
                    socialButtonsVariant: 'iconButton',
                  },
                }}
              />
            </Paper>
          </Box>
        </Container>
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 4,
            px: 2,
            mt: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid rgba(0, 188, 212, 0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '120px', // Adjust this value as needed
          }}>
          <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={2} justifyContent="flex-start">
                  <IconButton
                    color="primary"
                    component="a"
                    href="mailto:belayneh1ey@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ '&:hover': { color: '#00bcd4' } }}
                  >
                    <EmailIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    component="a"
                    href="https://www.linkedin.com/in/edombelayneh"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ '&:hover': { color: '#00bcd4' } }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ mt: 'auto' }}>
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} AceCardz - Edom Belayneh. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}