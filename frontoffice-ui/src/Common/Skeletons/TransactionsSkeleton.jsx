import { Box, Skeleton, Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const TransactionsSkeleton = () => {
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
          <Skeleton variant="rectangular" width={30} height={30} />
        </Box>
      </Box>

      {/* Table Skeleton Animation */}
      <TableContainer>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{ width: colIndex === 0 ? { xs: "50%", md: "35%" } : "auto", padding: { xs: 1, md: 1.5 } }}
                >
                  <Skeleton animation="wave" height={20} />
                </TableCell>
              ))}
              {/* Last column with colspan 2 and blank content */}
              <TableCell colSpan={2} sx={{ padding: { xs: 1, md: 1.5 } }} />
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* First column with two stacked Skeletons */}
                <TableCell sx={{ width: { xs: "50%", md: "35%" }, padding: { xs: 2, md: 1.1 } }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {/* Full-width Skeleton on top */}
                    <Skeleton animation="wave" height={20} width="100%" />

                    {/* Two Skeletons side by side at the bottom */}
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Skeleton animation="wave" height={20} width="30%" />
                      <Skeleton animation="wave" height={20} width="10%" />
                    </Box>
                  </Box>
                </TableCell>


                {/* Other columns */}
                {Array.from({ length: 6 }).map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{ width: "auto", padding: { xs: 2, md: 1.5 } }}
                  >
                    <Skeleton animation="wave" height={30} />
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

export default TransactionsSkeleton;
