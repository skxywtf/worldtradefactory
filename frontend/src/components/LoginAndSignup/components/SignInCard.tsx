import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {toast }from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from '@/firebase';

import { styled } from '@mui/material/styles';

// import ForgotPassword from './ForgotPassword';
import {FcGoogle} from 'react-icons/fc';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
  
    try {
      // Sign in the user with Google using Firebase auth
      const result = await signInWithPopup(auth, googleAuthProvider);
  
      // Extract the user information from the result
      const user = result.user;
  
      // Save the token and user info in localStorage
      // localStorage.setItem("token", user?.accessToken || "");
      localStorage.setItem("user", JSON.stringify(user));
  
      // Redirect to the main page after successful login
      router.push("/main");
    } catch (error: any) {
      // Handle error: log it and potentially show an error message to the user
      console.error("Error during Google sign-in:", error.message);
  
      // You could add UI feedback here, e.g.:
      // setError("Failed to sign in. Please try again.");
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
        const data = new FormData(event.currentTarget);
        const username = data.get('email');
        const password = data.get('password');
        // console.log({ username, password });
        
        const res = await axios.post("http://127.0.0.1:8000/api/login/", {
            username,
            password
        });
        
        console.log(res.data);
        localStorage.setItem("clientUsername", username as string);
        router.push("/main/account");
    } catch (err: any) {
        console.error(err);
        if (err.response) {
            const errorMessage = err.response.data.detail || "Error logging in. Please try again.";
            toast.error(errorMessage);
        } else if (err.request) {
            toast.error("No response from server. Please try again.");
        } else {
            toast.error("An unexpected error occurred.");
        }
    }
};


  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: '600' }}>
        Skxywtf
       </Typography>
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              href="/main/signup"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex',  flexDirection: 'column', gap: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          onClick={handleSignInWithGoogle}
          startIcon={<FcGoogle  />}
        >
          Sign in with Google
        </Button>
      </Box>
    </Card>
  );
}