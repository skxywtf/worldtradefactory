import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';

import { createTheme, ThemeProvider, styled, PaletteMode } from '@mui/material/styles';
import getSignUpTheme from '@/components/mui/theme/getSignUpTheme';
import { SkxywtfIcon } from './components/CustomIcons';
import { FcGoogle } from 'react-icons/fc';
import TemplateFrame from './components/TemplateFrame';
import { googleAuthProvider, auth } from '@/firebase'; // Assuming firebase config is set up
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signInWithPopup} from 'firebase/auth';
import ToggleColorMode from './components/ToggleColorModel';
import { useTheme } from 'next-themes';
import Header from './components/header';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'fit',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage: 'radial-gradient(ellipse at center, #1a2231 10%, #0d1117 70%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
}));

export default function SignUp() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mode, setMode] = React.useState<PaletteMode>(theme);
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false)

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = React.useState('');

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password_confirm, setpassword_confirm] = React.useState('');

  React.useEffect(() => {
      setIsClient(true)
    }, [])

  // Toggle themes logic remains the same
  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleSignInWithGoogle = async () => {
  
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      // Successfully signed in
      console.log('Google sign-in successful:', result.user);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the popup without completing the sign-in');
        // Handle this scenario, e.g., show a message to the user
        alert('Popup closed. Please try signing in again.');
      } else {
        console.error('Error during Google sign-in:', error);
        // Handle other potential errors here
        alert(`Error during Google sign-in: ${error.message}`);
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!username) {
      setNameError(true);
      setNameErrorMessage('Username is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!password_confirm || password !== password_confirm) {
      setPasswordConfirmError(true);
      setPasswordConfirmErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setPasswordConfirmError(false);
      setPasswordConfirmErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    try {
      const result = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        email,
        password,
        password_confirm,
      });
      console.log(result.data);
      toast.success(result.data.message || 'Account created successfully');
      router.push('/main/login');
    } catch (error : any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Error during signup';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  if(!isClient) return null

  return (
    
    // // <TemplateFrame
    // //   toggleCustomTheme={toggleCustomTheme}
    // //   showCustomTheme={showCustomTheme}
    // //   mode={mode}
    // //   toggleColorMode={toggleColorMode}
    // // >
    //   {/* <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}> */}
    //     {/* <CssBaseline enableColorScheme /> */}
    //     {/* <SignUpContainer direction="column" justifyContent="space-between"> */}
    //       {/* <Stack
    //         sx={{
    //           justifyContent: 'center',
    //           height: '100dvh',
    //           p: 2,
    //         }}
    //       > */}
    //         // <Card variant="outlined">
    //         //   {/* <SkxywtfIcon /> */}
    //         //   <Typography
    //         //     component="h1"
    //         //     variant="h4"
    //         //     sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
    //         //   >
    //         //     Sign up
    //         //   </Typography>
    //         //   <Box
    //         //     component="form"
    //         //     onSubmit={handleSubmit}
    //         //     sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    //         //   >
    //         //     <FormControl>
    //         //       <FormLabel htmlFor="username">Username</FormLabel>
    //         //       <TextField
    //         //         autoComplete="username"
    //         //         name="username"
    //         //         required
    //         //         fullWidth
    //         //         id="username"
    //         //         placeholder="Your username"
    //         //         value={username}
    //         //         onChange={(e) => setUsername(e.target.value)}
    //         //         error={nameError}
    //         //         helperText={nameErrorMessage}
    //         //         color={nameError ? 'error' : 'primary'}
    //         //       />
    //         //     </FormControl>
    //         //     <FormControl>
    //         //       <FormLabel htmlFor="email">Email</FormLabel>
    //         //       <TextField
    //         //         required
    //         //         fullWidth
    //         //         id="email"
    //         //         placeholder="your@email.com"
    //         //         name="email"
    //         //         autoComplete="email"
    //         //         variant="outlined"
    //         //         value={email}
    //         //         onChange={(e) => setEmail(e.target.value)}
    //         //         error={emailError}
    //         //         helperText={emailErrorMessage}
    //         //         color={emailError ? 'error' : 'primary'}
    //         //       />
    //         //     </FormControl>
    //         //     <FormControl>
    //         //       <FormLabel htmlFor="password">Password</FormLabel>
    //         //       <TextField
    //         //         required
    //         //         fullWidth
    //         //         name="password"
    //         //         placeholder="••••••"
    //         //         type="password"
    //         //         id="password"
    //         //         autoComplete="new-password"
    //         //         variant="outlined"
    //         //         value={password}
    //         //         onChange={(e) => setPassword(e.target.value)}
    //         //         error={passwordError}
    //         //         helperText={passwordErrorMessage}
    //         //         color={passwordError ? 'error' : 'primary'}
    //         //       />
    //         //     </FormControl>
    //         //     <FormControl>
    //         //       <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
    //         //       <TextField
    //         //         required
    //         //         fullWidth
    //         //         name="passwordConfirm"
    //         //         placeholder="••••••"
    //         //         type="password"
    //         //         id="passwordConfirm"
    //         //         value={password_confirm}
    //         //         onChange={(e) => setpassword_confirm(e.target.value)}
    //         //         error={passwordConfirmError}
    //         //         helperText={passwordConfirmErrorMessage}
    //         //         color={passwordConfirmError ? 'error' : 'primary'}
    //         //       />
    //         //     </FormControl>
    //         //     <FormControlLabel
    //         //       control={<Checkbox value="allowExtraEmails" color="primary" />}
    //         //       label="I want to receive updates via email."
    //         //     />
    //         //     <Button
    //         //       type="submit"
    //         //       fullWidth
    //         //       variant="contained"
    //         //     >
    //         //       Sign up
    //         //     </Button>
    //         //     <Typography sx={{ textAlign: 'center' }}>
    //         //       Already have an account?{' '}
    //         //       <span>
    //         //         <Link
    //         //           href="/main/login"
    //         //           variant="body2"
    //         //           sx={{ alignSelf: 'center' }}
    //         //         >
    //         //           Sign in
    //         //         </Link>
    //         //       </span>
    //         //     </Typography>
    //         //   </Box>
    //         //   <Divider>
    //         //     <Typography sx={{ color: 'text.secondary' }}>or</Typography>
    //         //   </Divider>
    //         //   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    //         //     <Button
    //         //       fullWidth
    //         //       variant="outlined"
    //         //       onClick={handleSignInWithGoogle}
    //         //     >
    //         //       <FcGoogle size={30} />
    //         //       Continue with Google
    //         //     </Button>
    //         //   </Box>
    //         // </Card>
    //       {/* </Stack> */}
    //     {/* </SignUpContainer> */}
    //   {/* </ThemeProvider> */}
    // //  </TemplateFrame>

    <TemplateFrame
     toggleCustomTheme={toggleCustomTheme}
     showCustomTheme={showCustomTheme}
     mode={mode}
     toggleColorMode={toggleColorMode}
     >      
     <div className="flex justify-center items-center border-b-2 border-white"> 
      <Header />
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} >
      <ToggleColorMode
                data-screenshot="toggle-mode"
                mode={mode}
                toggleColorMode={toggleColorMode}
              />
      </button>
      </div>
      <SignUpContainer direction="column" justifyContent="space-between">
      <Stack
            sx={{
              justifyContent: 'center',
              height: 'fit',
              p: 2,
            }}
          >
      <Card variant="outlined">
              {/* <SkxywtfIcon /> */}
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={emailError ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    placeholder="••••••"
                    type="password"
                    id="passwordConfirm"
                    value={password_confirm}
                    onChange={(e) => setpassword_confirm(e.target.value)}
                    error={passwordConfirmError}
                    helperText={passwordConfirmErrorMessage}
                    color={passwordConfirmError ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Sign up
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                  Already have an account?{' '}
                  <span>
                    <Link
                      href="/main/login"
                      variant="body2"
                      sx={{ alignSelf: 'center' }}
                    >
                      Sign in
                    </Link>
                  </span>
                </Typography>
              </Box>
              <Divider>
                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
              </Divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleSignInWithGoogle}
                >
                  <FcGoogle size={30} />
                  Continue with Google
                </Button>
              </Box>
            </Card>
          </Stack>
          </SignUpContainer>
    </TemplateFrame>
  );
}
