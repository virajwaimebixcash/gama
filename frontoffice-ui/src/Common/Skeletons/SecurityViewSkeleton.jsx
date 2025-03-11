import { Box, Skeleton, Typography } from "@mui/material";

const SecurityViewSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Heading & Search Bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Skeleton variant="text" height={40} sx={{ width: { xs: "100%", md: "30%" } }} />
      
      </Box>

      {/* First Row: 100% on small screens, 40% 30% 30% on large */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 2 }}>
        <Box sx={{ width: { xs: "100%", md: "45%" }, height: 365, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width="60%" height={30} />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Skeleton width="30%" height={20} />
            <Skeleton width="30%" height={20} />
            <Skeleton width="30%" height={20} />
          </Box>
          <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 2, mt: 2 }} />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "30%" }, height: 365, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={40} sx={{ width: "25%", borderRadius: 1 }} />
            ))}
          </Box>
          <Box sx={{ height: 2, bgcolor: "grey.300", mb: 1 }} />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 2 }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Box key={index} sx={{ height: 120, bgcolor: "grey.100", borderRadius: 2, p: 0 }}>
                <Typography variant="h6">
                  <Skeleton width="60%" />
                </Typography>
                <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 2 }} />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "25%" }, height: 365, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Skeleton width="40%" height={30} />
            <Skeleton variant="rectangular" width={130} height={35} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 2 }}>
            {[...Array(2)].map((_, i) => (
              <Box key={i} sx={{ width: "100%" }}>
                <Skeleton width="40%" height={20} />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Box>
            ))}
          </Box>
          {[...Array(2)].map((_, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Skeleton width="100%" height={25} />
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Skeleton variant="rectangular" width={120} height={40} />
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </Box>
      </Box>

      {/* Second Row: Responsive Layout */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 2 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} sx={{ width: { xs: "100%", md: "33%" }, height: 365, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb:2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton width="60%" height={30} />
            </Box>
            <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
          </Box>
        ))}
      </Box>

      {/* Third Row: 30% 70% */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 2 }}>
        <Box sx={{ width: { xs: "100%", md: "30%" }, height: 365, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 , mb:2  }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width="60%" height={30} />
          </Box>
          <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "70%" }, height: 365, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb:2  }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width="60%" height={30} />
          </Box>
          <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
        </Box>
      </Box>

      {/* Fourth Row: 33% 33% 33% */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} sx={{ width: { xs: "100%", md: "33%" }, height: 365, bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb:2  }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width="60%" height={30} />
          </Box>
            <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SecurityViewSkeleton;
