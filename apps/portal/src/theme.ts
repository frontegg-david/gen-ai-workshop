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
            color: 'inherit',
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
          border: 0,
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
          'solidBg': '#263621',
          'solidBorder': '#202b1d',
          'solidHoverBg': '#294022',
          'solidHoverBorder': '#1d251b',
          'solidActiveBg': '#1a2018',
          'solidActiveBorder': '#171b15',
          'solidDisabledBg': '#2c4b22',
          'solidDisabledBorder': '#2b4622',
          50: '#2c661a',
          100: '#2d611d',
          200: '#2d5620',
          300: '#2c4b22',
          400: '#294022',
          500: '#263621',
          600: '#202b1d',
          700: '#1a2018',
          800: '#131512',
          900: '#0a0a09',


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
