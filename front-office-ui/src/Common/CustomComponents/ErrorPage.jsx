import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const ErrorPage = () => {
  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <Grid size={{ xs: 12, lg: 12, xl: 12 }}>
          <Grid container direction="column" alignItems="center">
            <Grid>
              <Typography variant="h1" align="center" sx={{ fontSize: '3rem', marginBottom: '1rem' }}>
                SOMETHING WENT WRONG
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h4" align="center" fontWeight="bold">
                PLEASE TRY AGAIN
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
