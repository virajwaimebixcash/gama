import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataGridComponent = ({
  columns = 4,
  itemStyle = {},
  titleStyle = {},
  valueStyle = {},
  multilanguage = (e) => e,
  userData = [{}]
}) => {

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        {userData?.map((item, index) => (
          <Grid item xs={12} md={Array.isArray(item.value) ? 12 : 12 / columns} key={index}>
            <Card sx={{ ...itemStyle, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ ...titleStyle, fontWeight: 'bold', color: 'primary.main' }}>
                  {multilanguage(item.title)}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {Array.isArray(item.value) ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {item.value.length > 0 && Object.keys(item.value[0]).map((key, keyIndex) => (
                            <TableCell key={keyIndex}><strong>{multilanguage(key)}</strong></TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.value.map((val, subIndex) => (
                          <TableRow key={subIndex}>
                            {Object.keys(val).map((key, keyIndex) => (
                              <TableCell key={keyIndex}>
                                <Typography variant="body1" sx={{ ...valueStyle }}>
                                  {typeof(val[key])!=='object' ? val[key]?.toString() : 'N/A'}
                                </Typography>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body1" sx={{ ...valueStyle }}>
                    {item.value?.toString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DataGridComponent;
