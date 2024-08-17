
'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from 'firebase/firestore';
import db from '@/firebase';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Fade,
  Grid,
  Stack,
} from '@mui/material';
import { useSearchParams } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlipIcon from '@mui/icons-material/Flip';
import { useRouter } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
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

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        async function getFlashCard() {
            if (!search || !user) {
                return;
            }
            const colRef = collection(doc(collection(db, "users"), user.id), search)
            const docs = await getDocs(colRef);
            const flashcards = [];
            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()});
            });
            setFlashcards(flashcards);
        }
        getFlashCard();
    }, [search, user]);

    if (!isLoaded || !isSignedIn || flashcards.length === 0) {
        return <Typography>Loading...</Typography>;
    }

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setCurrentCardIndex((prevIndex) => 
            prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
        );
        setIsFlipped(false);
    };

    const handlePrevious = () => {
        setCurrentCardIndex((prevIndex) => 
            prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
        );
        setIsFlipped(false);
    };

    const back = () => {
        router.push('/flashcards');
    }

    const currentCard = flashcards[currentCardIndex];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                        <UserButton />
                        </SignedIn> 
                    </Toolbar>
                </AppBar>
                <Box sx={{mt: 15, ml: 10}}>
                    <IconButton>
                        <ArrowBackIosIcon onClick={back} fontSize='large' />
                    </IconButton>        
                </Box>
                <Container maxWidth="md" sx={{ mt: 1, mb: 4 }}>
                    <Fade in={true} timeout={1000}>
                        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{
                            mb: 6,
                            background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            {search}
                        </Typography>
                    </Fade>
                    <Card 
                        sx={{ 
                            minHeight: 300, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            cursor: 'pointer',
                            perspective: 1000,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            mt: 3,
                        }}
                        onClick={handleFlip}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}>
                            <CardContent sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 4,
                            }}>
                                <Typography variant="h4" component="div" align="center">
                                    {currentCard.front}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: 'rotateY(180deg)',
                                padding: 4,
                            }}>
                                <Typography variant="h4" component="div" align="center">
                                    {currentCard.back}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                        <IconButton onClick={handlePrevious} color="primary" sx={{ fontSize: '2rem' }}>
                            <ArrowBackIcon fontSize="inherit" />
                        </IconButton>
                        <Button 
                            variant="contained" 
                            startIcon={<FlipIcon />}
                            onClick={handleFlip}
                            sx={{ 
                                px: 4,
                                py: 1.5,
                                fontSize: '1.2rem',
                                background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                                }
                            }}
                        >
                            Flip
                        </Button>
                        <IconButton onClick={handleNext} color="primary" sx={{ fontSize: '2rem' }}>
                            <ArrowForwardIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                    <Typography sx={{ mt: 3, textAlign: 'center' }} color="primary">
                        Card {currentCardIndex + 1} of {flashcards.length}
                    </Typography>
                </Container>
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