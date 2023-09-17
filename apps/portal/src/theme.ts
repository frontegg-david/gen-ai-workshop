import { extendTheme } from '@mui/joy/styles';

// A custom theme for this app
const theme = extendTheme({
  fontFamily: {
    body: '"Public Sans", sans-serif',
  },
  components: {
    JoyListSubheader: {
      styleOverrides: {
        root: {
          color: 'rgb(145, 158, 171)',
          fontFamily: '"Public Sans", sans-serif',
          letterSpacing: 0,
        }
      }
    },
    JoyListItemButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: 'background-color 200ms',
          '& .MuiSvgIcon-root': {
            color:'inherit',
            opacity: 0.8
          },
          '&.Mui-selected': {
            color: 'rgb(0, 167, 111)',
            backgroundColor: 'rgba(0, 167, 111, 0.08)',
            fontWeight: 600,
            '.MuiSvgIcon-root': {
              opacity: 1
            }
          },
        }
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'rgb(255, 255, 255)',
          border:0,
          color: 'rgb(33, 43, 54)',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          backgroundImage: 'none',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          zIndex: 0,
          display: 'flex',
          boxAlign: 'center',
          padding: '24px'
        }
      }
    }
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          // generate palette for blue color from https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=3F51B5
          solidBg: '#0d6efd',
          solidBorder: '#0d6efd',
          solidHoverBg: '#0b5ed7',
          solidHoverBorder: '#0a58ca',
          solidActiveBg: '#0a58ca',
          solidActiveBorder: '#0a53be',
          solidDisabledBg: '#0d6efd',
          solidDisabledBorder: '#0d6efd',
          50: '#C0CCD9',
          100: '#A5B8CF',
          200: '#6A96CA',
          300: '#4886D0',
          400: '#2178DD',
          500: '#096BDE',
          600: '#1B62B5',
          700: '#265995',
          800: '#2F4968',
          900: '#2F3C4C',
        },

        neutral: {
          500: '#00a76f',
          plainActiveColor: '#00a76f',
        }
      },
    },
  },

});

export default theme;
