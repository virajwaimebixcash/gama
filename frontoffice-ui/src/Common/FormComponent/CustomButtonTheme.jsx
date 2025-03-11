import React from 'react';
import { Button, ThemeProvider, createTheme } from '@mui/material';

// Step 1: Create a custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Custom primary color
      contrastText: '#fff', // Text color for primary buttons
    },
    secondary: {
      main: '#472D68', // Custom secondary color
      contrastText: '#000',
    },
  },
  typography: {
    button: {
      textTransform: 'none', // Disable uppercase text for buttons
      fontSize: '1rem', // Custom font size for buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Rounded corners
          padding: '10px 20px', // Custom padding
        },
        containedPrimary: {
          backgroundColor: '#6200ea', // Custom background color for primary button
          '&:hover': {
            backgroundColor: '#3700b3', // Custom hover color
          },
        },
        containedSecondary: {
          backgroundColor: '#472D68', // Custom background color for secondary button
          '&:hover': {
            backgroundColor: '#018786', // Custom hover color for secondary button
          },
        },
      },
    },
  },
});

function CustomButtonTheme({ label, ...props }) {
  return (
    // Step 2: Wrap your component tree with ThemeProvider
    <ThemeProvider theme={customTheme}>
      <div>
        {/* Step 3: Use Button components as usual */}
        <Button variant="contained" color="primary" {...props}>
        {label}
        </Button>
        <Button variant="contained" color="secondary" {...props}>
        {label}
        </Button>
        <Button variant="outlined" color="primary" {...props}>
        {label}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default CustomButtonTheme;
