import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import getSignInSideTheme from '../../mui/theme/getSignInSideTheme'
import SignInCard from './SignInCard';
import Content from './content';
import TemplateFrame from './TemplateFrame';
import HeaderLand from '@/components/landing page/header footer landing/HeaderLand';
import ToggleColorMode from './ToggleColorModel';
import Header from './header';
import { useTheme } from 'next-themes';

export default function SignInSide() {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const { theme, setTheme, systemTheme } = useTheme();
  const SignInSideTheme = createTheme(getSignInSideTheme(mode));
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  React.useEffect(() => {
        setIsClient(true)
      }, [])

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  if(!isClient) return null

  return (
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
    
      <ThemeProvider theme={showCustomTheme ? SignInSideTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Stack
          direction="column"
          component="main"
          sx={[
            {
              justifyContent: 'space-between',
              height: { xs: 'auto', md: '100%' },
            },
            (theme) => ({
              backgroundImage:
                'radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundSize: 'cover',
              ...theme.applyStyles('dark', {
                backgroundImage: 'radial-gradient(ellipse at center, #1a2231 10%, #0d1117 70%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }),
            }),
          ]}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: 2,
              m: 'auto',
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </ThemeProvider>
    </TemplateFrame>
  );
}