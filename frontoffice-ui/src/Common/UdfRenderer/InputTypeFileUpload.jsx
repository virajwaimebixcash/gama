import { useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid2';

const MyInputTypeFileUpload = ({
  multilanguage,
  inputError,
  isTable,
  isInvalid = false,
  color = 'primary',
  name,
  TextFieldLabel,
  component,
  control,
  allowedTypes = [],
  maxSize = 5000000,
  disable,
  sx = {},
}) => {
  const [fileName, setFileName] = useState('');
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (file, onChange) => {
    if (!file) return;
    
    if (allowedTypes.length && !allowedTypes.includes(file.type)) {
      alert('Invalid file type.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size exceeds the limit.');
      return;
    }

    setFileName(file.name);
    const base64File = await convertToBase64(file);
    onChange(base64File);
  };

  return (
    <Grid container>
      {!isTable && (
        <Typography variant="body1" gutterBottom>
          {multilanguage(TextFieldLabel)}
        </Typography>
      )}
      <Box display="flex" alignItems="center" gap={2}>
        {/* <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <>
              <Button
                variant="contained"
                component="label"
                color={color}
                disabled={disabled}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e.target.files[0], onChange)}
                />
              </Button>
              <TextField
                value={fileName || 'No file chosen'}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                size="small"
              />
            </>
          )}
        /> */}

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <>
              <Button
                variant="contained"
                component="label"
                disabled={disable}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileChange(file, onChange); // Pass the file and the onChange handler
                    }
                  }}
                />
              </Button>
              <TextField
                value={fileName || "No file chosen"} // Ensure fileName state is correctly read
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                size="small"
                style={{ minWidth: 200 }}
              />
            </>
          )}
        />

        {isInvalid && (
          <Typography color="error" variant="body2">
            {inputError}
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export default MyInputTypeFileUpload;
