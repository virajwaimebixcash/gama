import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

function FileUploadComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Create FormData to send file to the server
    const formData = new FormData();
    formData.append("file", file);
    // Perform the upload here (e.g., with fetch or axios)
    // For demonstration, log the file info to the console
    // fetch('your-upload-endpoint', { method: 'POST', body: formData });
    alert("File uploaded successfully!");
  };

  return (
    <Box display="flex" alignItems="center" gap={2} >
      <Button variant="contained" component="label">
        Choose File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      <TextField
        value={file ? file.name : "No file chosen"}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        size="small"
        style={{ minWidth: 200 }}
      />

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </Button>
    </Box>
  );
}

export default FileUploadComponent;

 