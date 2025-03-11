import { Box, Card, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const SecurityViewSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>

      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <Item className='fixheights mostly-customized-scrollbar'>
          <Skeleton variant="text" width="50%" height={30} />
          <Skeleton variant="rectangular" height={200} sx={{ marginY: 2 }} />
          <Skeleton variant="text" width="40%" />
        </Item>
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <Item className='fixheights mostly-customized-scrollbar'>
          <Skeleton variant="text" width="50%" height={30} />
          <Skeleton variant="rectangular" height={200} sx={{ marginY: 2 }} />
          <Skeleton variant="text" width="40%" />
        </Item>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <Item className='fixheights mostly-customized-scrollbar'>
          <Skeleton variant="text" width="50%" height={30} />
          <Skeleton variant="rectangular" height={200} sx={{ marginY: 2 }} />
          <Skeleton variant="text" width="40%" />
        </Item>
      </Grid>

      {/* Order Section */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ padding: 2 }}>
          <Typography variant="h6">
            <Skeleton width="30%" />
          </Typography>
          <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginY: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default SecurityViewSkeleton;
