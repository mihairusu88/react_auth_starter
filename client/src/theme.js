import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2176FF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#d32f2f',
    },
    error: {
      main: '#FF5714',
    },
    warning: {
      main: '#EBD152',
    },
    success: {
      main: '#38FF39',
    },
    light: {
      main: '#FFFFFF',
    },
    dark: {
      main: '#000000',
    },
  },
  overrides: {
    MuiButton: {
      containedSizeLarge: {
        padding: '12px 25px'
      }
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: '#2176FF',
        },
      }
    },
    MuiInputLabel: {
      root: {
        '&$focused': {
          color: '#2176FF'
        }
      }
    },
    MuiSnackbar: {
      anchorOriginTopCenter: {
        width: '100%',
        top: '0 !important',
      }
    },
    MuiSnackbarContent: {
      root: {
        borderRadius: 0,
        width: '100%',
      },
      message: {
        margin: '0 auto'
      },
      action: {
        marginLeft: 0
      }
    }
  },
});

export default theme;