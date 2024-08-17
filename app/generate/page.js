
'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, setDoc, doc, getDoc, writeBatch } from 'firebase/firestore';
import db from '@/firebase';
import { 
  Container, 
  Grid, 
  Card, 
  CardActionArea, 
  CardContent, 
  Typography, 
  Box, 
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
  Modal,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { UserButton } from '@clerk/nextjs';
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

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!isSignedIn) {
      router.push('/sign-up');
      return;
    }
    if (!user) {
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch('api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const back = () => {
    router.push('/flashcards');
  };

  const saveToFirebase = async () => {
    if (!name) {
      alert('Please enter a name for your flashcards');
      return;
    }

    const batch = writeBatch(db);
    const docRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('Flashcards with this name already exist');
        return;
      } else {
        collections.push({ name });
        batch.set(docRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(docRef, { flashcards: [{ name }] });
    }

    const colRef = collection(docRef, name);
    flashcards.forEach((flashcard) => {
      const card = doc(colRef);
      batch.set(card, flashcard);
    });

    await batch.commit();
    setModalOpen(false);
    router.push('/flashcards');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ background: 'transparent', backdropFilter: 'blur(5px)' }}>
          <Toolbar>
            <img src='/logo.png' style={{ mt: 0 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 1 }}>
              AceCardz
            </Typography>
            <UserButton />
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 15, ml: 10 }}>
          <IconButton>
            <ArrowBackIosIcon onClick={back} fontSize='large' />
          </IconButton>
        </Box>
        <Container maxWidth="md" sx={{ mt: 10, mb: 4, flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{
            background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Generate Flashcards
          </Typography>
          <Box sx={{ mb: 4 }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter text to generate flashcards"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
              startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{
                background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                }
              }}
            >
              {isGenerating ? 'Generating...' : 'Generate Flashcards'}
            </Button>
          </Box>

          {flashcards.length > 0 && (
            <Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{
                background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Generated Flashcards Preview
              </Typography>
              <Grid container spacing={2}>
                {flashcards.map((card, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <CardActionArea
                        onClick={() => handleFlip(index)}
                        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                      >
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {flipped[index] ? 'Answer' : 'Question'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {flipped[index] ? card.back : card.front}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setModalOpen(true)}
                  sx={{
                    background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                    }
                  }}
                >
                  Save Flashcards
                </Button>
              </Box>
            </Box>
          )}
        </Container>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Save Flashcards to Firebase
            </Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Collection Name"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={saveToFirebase}
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                }
              }}
            >
              Save
            </Button>
          </Box>
        </Modal>
        <Box
          component="footer"
          sx={{
            pt: 4,
            px: 2,
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
