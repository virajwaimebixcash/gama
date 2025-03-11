import { Box, Skeleton, Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const HoldingsSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}> {/* Adjust padding based on screen size */}

      {/* Heading with Right Side Icons */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap" }}>
        <Skeleton
          variant="text"
          height={30}
          sx={{ width: { xs: "100%", sm: 300 }, flexGrow: 0, mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="rectangular" width={30} height={30} />
          <Skeleton variant="rectangular" width={30} height={30} />
        </Box>
      </Box>

      {/* 6 Boxes Row (Responsive Grid) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" },
          gap: 2,
          mb: 3
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Box key={index} sx={{ height: 100, bgcolor: "grey.300", borderRadius: 5 }} />
        ))}
      </Box>

      {/* Table Skeleton Animation */}
      <TableContainer>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {Array.from({ length: 7 }).map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{ width: colIndex === 0 ? { xs: "50%", md: "35%" } : "auto", padding: { xs: 1, md: 1.5 } }}
                >
                  <Skeleton animation="wave" height={20} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{ width: colIndex === 0 ? { xs: "50%", md: "35%" } : "auto", padding: { xs: 2, md: 1.7 } }}
                  >
                    {colIndex === 0 ? (
                      // First column: Heading Skeleton above, three Skeletons below
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Skeleton animation="wave" height={20} width="60%" /> {/* Heading Skeleton */}
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Skeleton animation="wave" height={20} width="50%" />
                          <Skeleton animation="wave" height={20} width="30%" />
                          <Skeleton animation="wave" height={20} width="20%" />
                        </Box>
                      </Box>
                    ) : (
                      // Other columns: Single Skeleton
                      <Skeleton animation="wave" height={30} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};

export default HoldingsSkeleton;
