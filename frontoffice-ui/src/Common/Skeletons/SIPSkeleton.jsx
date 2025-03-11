import { Box, Skeleton, Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const SIPSkeleton = () => {
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

        </Box>
      </Box>

      {/* Table Skeleton Animation */}
      <TableContainer>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{ width: colIndex === 0 ? { xs: "50%", md: "35%" } : "auto", padding: { xs: 1, md: 1.5 } }}
                >
                  <Skeleton animation="wave" height={20} />
                </TableCell>
              ))}

              {/* Second Last Column (Blank) */}
              <TableCell sx={{ padding: { xs: 1, md: 1.5 } }} />

              {/* Last Column (With Skeleton Heading) */}
              <TableCell sx={{ padding: { xs: 1, md: 1.5 } }}>
                <Skeleton animation="wave" height={20} />
              </TableCell>
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

                  </Box>
                </TableCell>


                {/* Other columns */}
                {Array.from({ length: 5 }).map((_, colIndex) => (
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

export default SIPSkeleton;


