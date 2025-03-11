import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A35CFB', // Customize primary color
    },
    secondary: {
      main: '#472D68', // Customize secondary color
    },
    third: { // Add custom 'third' color
        main: '#8bc34a', // Light green color
        contrastText: '#fff', // Optional: customize text color
      },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Customize the button's border-radius
       
          textTransform: 'none', // Disable uppercase transformation
        },
      },
    },
  },
});

export default theme;
