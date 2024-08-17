
'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import db from '@/firebase';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import HouseIcon from '@mui/icons-material/House';
import getStripe from "@/utils/get-stripe";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


const drawerWidth = 240;

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

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [isPro, setIsPro] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFlashcards(userData.flashcards || []);
        setIsPro(userData.isPro || false);
      } else {
        await setDoc(docRef, { flashcards: [], isPro: false });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

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
      <CssBaseline />
      <Box sx={{ 
        display: 'flex',
        minHeight: '100vh', 
        background: 'linear-gradient(45deg, #121212 30%, #212121 90%)',
        overflow: 'hidden',
      }}>
        <AppBar position="fixed" sx={{ 
          background: 'transparent', 
          backdropFilter: 'blur(5px)',
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}>
          <Toolbar>
            <img src='/logo.png' style={{height: '50px', marginRight: '10px'}}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 1 }}>
              AceCardz
            </Typography>
            <UserButton />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              background: 'transparent',
              backdropFilter: 'blur(10px)',
              zIndex: (theme) => theme.zIndex.drawer - 1 
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {[
                { text: 'Home', icon: <HouseIcon />, onClick: () => router.push('/') },
                // { text: 'Dashboard', icon: <DashboardIcon />, onClick: () => router.push('/flashcards') },
                { text: 'Create New', icon: <AddIcon />, onClick: () => router.push('/generate') },
              ].map((item, index) => (
                <ListItem button key={item.text} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h4" gutterBottom sx={{
            background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Welcome to your Dashboard, {user.firstName}!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Subscription Status: {isPro ? 'Pro User' : 'Basic User'}
          </Typography>
          {!isPro && (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                mb: 4,
                background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                }
              }}
              onClick={handleSubmit}
            >
              Upgrade to Pro
            </Button>
          )}
          <Typography variant="h5" gutterBottom sx={{
            background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Your Flashcards
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6,
                    },
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                  onClick={() => router.push(`/flashcard?id=${flashcard.name}`)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {flashcard.name}
                    </Typography>
                    <Typography variant="body2">
                      Click to view this flashcard set
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {flashcards.length === 0 && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6">
                You don&apos;t have any flashcards yet. Create your first set!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                  }
                }}
                onClick={() => router.push('/generate')}
              >
                Create Flashcards
              </Button>
            </Box>
          )}
        </Box>
      </Box>
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
    </ThemeProvider>
  );
}