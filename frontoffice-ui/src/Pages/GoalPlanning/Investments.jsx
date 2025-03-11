import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Grid from '@mui/material/Grid2';
import '../../styles/GoalPlanning.css'
const Investments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "USA", company: "ABC Corp", position: "Manager" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", address: "456 Elm St", city: "Los Angeles", state: "CA", zip: "90001", country: "USA", company: "XYZ Inc", position: "Director" }
  ]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [open, setOpen] = useState(false);

  const handleEdit = (row) => {
    setEditRowId(row.id);
    setEditedData({ ...row });
  };

  const handleSave = (id) => {
    setRows(rows.map((row) => (row.id === id ? editedData : row)));
    setEditRowId(null);
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {isMobile ? (
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Grid container spacing={2}>
                    {Object.keys(row).filter(key => key !== "id").map((key, index) => (
                      <Grid item xs={6} key={index}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
                        <div>{row[key]}</div>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <IconButton onClick={() => handleEdit(row)}>
                        <EditIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ) : (
        <TableContainer  style={{ overflowX: "auto" }} className="forintables">
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(rows[0]).filter(key => key !== "id").map((key, index) => (
                  <TableCell key={index}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {Object.keys(row).filter(key => key !== "id").map((key) => (
                    <TableCell key={key}>
                      {editRowId === row.id ? (
                        <TextField value={editedData[key] || ""} onChange={(e) => handleChange(e, key)} className="padfinmodibox"/>
                      ) : (
                        row[key]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editRowId === row.id ? (
                      <IconButton onClick={() => handleSave(row.id)}>
                        <SaveIcon color="primary" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEdit(row)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <Button variant="contained" className="transborderbtn" startIcon={<AddIcon />} onClick={handleOpen} style={{ marginTop: 10 }}>
        Add New
      </Button>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>
          Holding component will call here
          <IconButton onClick={handleClose} style={{ position: "absolute", right: 10, top: 10 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Button variant="contained" color="primary" className="clsolemebtns" style={{ marginTop: 10 }} onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Investments;


 
 