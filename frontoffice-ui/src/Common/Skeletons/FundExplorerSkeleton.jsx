import { Box, Skeleton, Button } from "@mui/material";

const FundExplorerSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* First Row: Heading + Right Side Buttons & Icons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* Left Side: Heading */}
        <Skeleton variant="text" height={40} sx={{ width: { xs: "100%", md: "20%" } }} />

        {/* Right Side: Button + Two Icons + Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="contained" disabled sx={{ width: 100, height: 30 }} />
          <Skeleton variant="rectangular" width={30} height={30} />
          <Skeleton variant="rectangular" width={30} height={30} />
          <Button variant="contained" disabled sx={{ width: 100, height: 30 }} />
        </Box>
      </Box>

      {/* Second Row: 4 Boxes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {[...Array(16)].map((_, index) => (
          <Box key={index} sx={{ bgcolor: "grey.100", borderRadius: 2, p: 2 }}>
            {/* Box Content: Left (Image + Heading), Right (Skeleton Content) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton width="60%" height={30} />
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
            </Box>
            <Skeleton variant="rectangular" height={140} sx={{ mt: 2, borderRadius: 2 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FundExplorerSkeleton;

