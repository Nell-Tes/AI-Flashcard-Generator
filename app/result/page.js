
'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Container, Box, Typography, CircularProgress, ThemeProvider, createTheme, CssBaseline, IconButton } from "@mui/material"

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
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
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
  },
});

export default function ResultPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) {
                return
            }
            try {
                const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
                const sessionData = await res.json()

                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                setError('An error occurred while retrieving the session.')
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    const back = () => {
        router.push('/');
      }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{mt: 3, ml: 10, bgcolor: 'transparent'}}>
                <IconButton>
                    <ArrowBackIosIcon onClick={back} fontSize='large' />
                </IconButton>        
            </Box>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'linear-gradient(45deg, #121212 30%, #212121 90%)',
                }}
            >

                <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                    {loading ? (
                        <CircularProgress color="primary" />
                    ) : error ? (
                        <Typography variant="h6" color="error">{error}</Typography>
                    ) : session && session.payment_status === 'paid' ? (
                        <>
                            <Typography variant="h4" sx={{
                                background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}>
                                Thank you for your purchase!
                            </Typography>
                            <Box sx={{ mt: 2, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                                <Typography variant="h6" color="primary">Session ID: {session_id}</Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                                    We have received your payment. You will receive an email with the order details.
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4" sx={{
                                background: 'linear-gradient(45deg, #ff4081, #00bcd4)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}>
                                Payment failed
                            </Typography>
                            <Box sx={{ mt: 2, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Your payment was not successful. Please try again!
                                </Typography>
                            </Box>
                        </>
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    )
}