// 'use client';

// // `Things I want to improve:
// // Create a dashboard for the user
// // Make the landing page just a landing page, but once you sign in you have a dashboard
// // Pople who have pro obv get perks...
// // Think about perks they should get
// // Find a way to make this pretty as well
// // Also find a way to specify the number of flashcards a person can produce
// // Make a way i can travel from page to page..prbly in the dashboard section
// // Perks:
// // -> With Pro you can edit and delete flashcard sets
// // -> able to specify the number of flashcards that they want to produce
// // `



// import React from 'react';
// import { 
//   AppBar, 
//   Box, 
//   Button, 
//   Card, 
//   CardContent, 
//   Container, 
//   Grid, 
//   ThemeProvider, 
//   Toolbar, 
//   Typography, 
//   createTheme 
// } from '@mui/material';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import SpeedIcon from '@mui/icons-material/Speed';
// import CloudIcon from '@mui/icons-material/Cloud';
// import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
// import getStripe from '@/utils/get-stripe';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// });

// const Feature = ({ icon, title, description }) => (
//   <Card raised sx={{ height: '100%' }}>
//     <CardContent>
//       <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
//         {icon}
//         <Typography variant="h5" component="div" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {description}
//         </Typography>
//       </Box>
//     </CardContent>
//   </Card>
// );

// const PricingOption = ({ title, price, description, features, submitFunc }) => (
//   <Card raised sx={{ height: '100%', p: 2 }}>
//     <CardContent>
//       <Box textAlign="center">
//         <Typography variant="h5" component="div" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="h4" component="div" color="primary" gutterBottom>
//           ${price}/month
//         </Typography>
//         <Typography variant="body1" color="text.secondary" paragraph>
//           {description}
//         </Typography>
//         <ul>
//           {features.map((feature, index) => (
//             <Typography variant="body2" color="text.secondary" key={index} component="li">
//               {feature}
//             </Typography>
//           ))}
//         </ul>
//         <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={submitFunc}>
//           Get Started
//         </Button>
//       </Box>
//     </CardContent>
//   </Card>
// );

// export default function LandingPage() {

//   const handleSubmit = async () => {
//     const checkoutSession = await fetch('/api/checkout_sessions', {
//       method: 'POST',
//       headers: {
//         origin: 'http://localhost:3000',
//       },
//     })

//     const checkoutSessionJson = await checkoutSession.json()
    
//     if (checkoutSession.statusCode === 500){
//       console.error(checkoutSession.message)
//       return
//     }

//     const stripe = await getStripe()
//     const {error} = await stripe.redirectToCheckout({
//       sessionId: checkoutSessionJson.id, 
//     })

//     if (error) {
//       console.warn(error.message)
//     }
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             FlashCard Pro
//           </Typography>
//           <SignedOut>
//           <Button color="inherit" href="/sign-in">Login</Button>
//           <Button color="inherit" variant="outlined" sx={{ ml: 1 }} href="/sign-up">
//             Sign Up
//           </Button>
//           </SignedOut> 
//           <SignedIn> 
//             <UserButton />
//           </SignedIn> 
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg">
//         {/* Hero Section */}
//         <Box sx={{ my: 4, textAlign: 'center' }}>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Create Flashcards Instantly
//           </Typography>
//           <Typography variant="h5" component="p" color="text.secondary" paragraph>
//             Turn any text into effective flashcards for better learning
//           </Typography>
//           <Button variant="contained" size="large" sx={{ mt: 2 }}>
//             Get Started
//           </Button>
//         </Box>

//         {/* Features Section */}
//         <Box sx={{ my: 8 }}>
//           <Typography variant="h3" component="h2" gutterBottom textAlign="center">
//             Features
//           </Typography>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4}>
//               <Feature 
//                 icon={<AutoStoriesIcon sx={{ fontSize: 60, color: 'primary.main' }} />}
//                 title="Automatic Generation"
//                 description="Just paste your text and we'll create flashcards for you."
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Feature 
//                 icon={<SpeedIcon sx={{ fontSize: 60, color: 'primary.main' }} />}
//                 title="Quick Learning"
//                 description="Efficient spaced repetition system for faster memorization."
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Feature 
//                 icon={<CloudIcon sx={{ fontSize: 60, color: 'primary.main' }} />}
//                 title="Cloud Sync"
//                 description="Access your flashcards from any device, anytime."
//               />
//             </Grid>
//           </Grid>
//         </Box>

//          {/* Pricing Section */}
//          <Box sx={{ my: 8, textAlign: 'center' }}>
//           <Typography variant="h3" component="h2" gutterBottom>
//             Pricing
//           </Typography>
//           <Grid container spacing={4} justifyContent="center">
//             <Grid item xs={12} md={4}>
//               <Box>
//                 <Card raised sx={{ height: '100%', p: 2 }}>
//                   <CardContent>
//                     <Box textAlign="center">
//                       <Typography variant="h5" component="div" gutterBottom>
//                         Basic
//                       </Typography>
//                       <Typography variant="h4" component="div" color="primary" gutterBottom>
//                         Free
//                       </Typography>
//                       <Typography variant="body1" color="text.secondary" paragraph>
//                         For individuals just getting started.
//                       </Typography>
//                       <ul>
//                         <li>Unlimited flashcards</li>
//                         <li>Access on any device</li>
//                         <li>Basic spaced repetition</li>
//                       </ul>
//                       <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/generate">
//                         Get Started
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Box>
//             </Grid>            
//             <Grid item xs={12} md={4}>
//               <Box>
//               <Card raised sx={{ height: '100%', p: 2 }}>
//                 <CardContent>
//                   <Box textAlign="center">
//                     <Typography variant="h5" component="div" gutterBottom>
//                     Pro
//                     </Typography>
//                     <Typography variant="h4" component="div" color="primary" gutterBottom>
//                       $10/month
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary" paragraph>
//                     For power users who need more.
//                     </Typography>
//                     <ul>
//                       <li>All Basic features</li>
//                       <li>Advanced spaced repetition</li>
//                       <li>Priority support</li>      
//                     </ul>
//                     <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
//                       Get Started
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  ThemeProvider, 
  Toolbar, 
  Typography, 
  createTheme,
  useMediaQuery,
  IconButton,
  Link,
  Fade,
  Grow,
  Zoom,
  Stack
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CasinoIcon from '@mui/icons-material/Casino';
import getStripe from '@/utils/get-stripe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

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
    h2: {
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
    MuiCard: {
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

const Feature = ({ icon, title, description }) => (
  <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
    <Card raised sx={{ height: '100%', background: 'rgba(255, 255, 255, 0.05)' }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
          {icon}
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Grow>
);

const PricingOption = ({ title, price, description, features, submitFunc }) => (
  <Zoom in={true} style={{ transitionDelay: '500ms' }}>
    <Card raised sx={{ height: '100%', p: 1, background: 'rgba(255, 255, 255, 0.05)' }}>
      <CardContent>
        <Box
          sx={{
            p: 3,
            border: '1px solid #00bcd4',
            borderRadius: 2,
            boxShadow: 2,
            textAlign: 'left',
            backgroundColor: 'transparent',
            transition: '0.3s',
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 2 }}>
            ${price}
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 4 }}>
            {description}
          </Typography>
          <Box sx={{ mb: 4 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />
                <Typography variant="body2">{feature}</Typography>
              </Box>
            ))}
          </Box>
            <Button variant="outlined" color="primary" onClick={submitFunc}>
              Get Started
            </Button>
        </Box>
      </CardContent>
    </Card>
  </ Zoom>
);


// const PricingOption = ({ title, price, description, features, submitFunc }) => (
//   <Zoom in={true} style={{ transitionDelay: '500ms' }}>
//     <Card raised sx={{ height: '100%', p: 2, background: 'rgba(255, 255, 255, 0.05)' }}>
//       <CardContent>
//         <Box textAlign="center">
//           <Typography variant="h5" component="div" gutterBottom>
//             {title}
//           </Typography>
//           <Typography variant="h4" component="div" color="primary" gutterBottom>
//             ${price}/month
//           </Typography>
//           <Typography variant="body1" color="text.secondary" paragraph>
//             {description}
//           </Typography>
//           <ul>
//             {features.map((feature, index) => (
//               <Typography variant="body2" color="text.secondary" key={index} component="li">
//                 {feature}
//               </Typography>
//             ))}
//           </ul>
//           <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={submitFunc}>
//             Get Started
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   </Zoom>
// );

export default function LandingPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()
    
    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id, 
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(45deg, #121212 30%, #212121 90%)',
        overflow: 'hidden',
      }}>
        <AppBar position="fixed" sx={{ background: 'transparent', backdropFilter: 'blur(5px)' }}>
          <Toolbar>
            <img 
              src='/logo.png'
              style={{mt: 0}}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 1 }}>
              AceCardz
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="secondary" variant="outlined" sx={{ ml: 1 }} href="/sign-up">
                Sign Up
              </Button>
            </SignedOut> 
            <SignedIn> 
              <Button color="inherit" href="/flashcards" sx={{ mr: 2 }}>
                Dashboard
              </Button>
              <UserButton />
            </SignedIn> 
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ 
            mt: 2, 
            mb: 0,
            pt: 10, 
            textAlign: 'center', 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <Fade in={true} timeout={1000}>
              <Typography variant="h1" component="h1" gutterBottom sx={{ 
                fontSize: isSmallScreen ? '3rem' : '4.5rem',
                background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Deal the Winning Hand when Learning with AceCardz.
              </Typography>
            </Fade>
            <Fade in={true} timeout={2000}>
              <Box>
                <Typography variant="h6" component="p" color="primary" sx={{ mb: 2 }}>
                Turn your chapters into flashcards or get instant cards on any topic AceCardz!
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.2rem',
                    background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                    }
                  }}
                  href='/generate'
                >
                  Start Acing Now
                </Button>
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  No credit card required • Free plan available
                </Typography>
              </Box>
            </Fade>
          </Box>

          {/* Features Section */}
          <Box sx={{ mt: 1, mb: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h2" component="h2" gutterBottom textAlign="center" sx={{
              mb: 6,
              background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Features
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Feature 
                  icon={<AutoStoriesIcon sx={{ fontSize: 80, color: 'primary.main' }} />}
                  title="Automatic Generation"
                  description="Just paste your text and we'll create flashcards for you."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Feature 
                  icon={<SpeedIcon sx={{ fontSize: 80, color: 'secondary.main' }} />}
                  title="Quick Learning"
                  description="Efficient spaced repetition system for faster memorization."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Feature 
                  icon={<CloudIcon sx={{ fontSize: 80, color: 'primary.main' }} />}
                  title="Cloud Sync"
                  description="Access your flashcards from any device, anytime."
                />
              </Grid>
              
            </Grid>


            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Feature 
                  icon={<TrendingUpIcon sx={{ fontSize: 80, color: 'primary.main' }} />}
                  title="High Stakes Progress Tracking"
                  description="Raise the stakes on your learning. Track your progress and see your knowledge grow as you ace every study session."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Feature 
                  icon={<PsychologyIcon sx={{ fontSize: 80, color: 'secondary.main' }} />}
                  title="Mind Reading Algorithms"
                  description="Our AI doesn't just create cards, it reads your mind. Get personalized decks tailored to your learning style and pace."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Feature 
                  icon={<CasinoIcon sx={{ fontSize: 80, color: 'primary.main' }} />}
                  title="Jackpot of Topics"
                  description="Hit the jackpot with our vast library of subjects. Whether it's science, languages, or anything in between, AceCardz has a winning deck for you."
                />
              </Grid>
            </Grid>
          </Box>

          {/* Pricing Section */}
          {/* horizontal line */}
          <Box sx={{ my: 8, textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* <Paper elevation="1"> */}
            <Typography variant="h2" component="h2" gutterBottom sx={{
              mb: 6,
              background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Pricing
            </Typography>
            <Grid container spacing={10} justifyContent="center">
              <Grid item xs={12} md={4}>
                <PricingOption
                  title="Basic"
                  price="0"
                  description="For individuals just getting started."
                  features={[
                    'Unlimited flashcards',
                    'Basic AI flashcard creation',
                    'Limited support and features',
                  ]}
                  submitFunc={() => window.location.href = '/generate'}
                />
              </Grid>            
              <Grid item xs={12} md={4}>
                <PricingOption
                  title="Pro"
                  price="10 /month"
                  description="For power users who need more."
                  features={[
                    'All Basic features',
                    'Access on any device',
                    'Priority support and updates',
                  ]}
                  submitFunc={handleSubmit}
                />
              </Grid>
            </Grid>
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
