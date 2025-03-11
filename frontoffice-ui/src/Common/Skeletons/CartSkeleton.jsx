import { Box, Skeleton, Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const CartSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>

      {/* Table Skeleton */}
      <TableContainer>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {/* First Column (70%) - Checkbox + One Span */}
              <TableCell sx={{ width: { xs: "70%", md: "70%" }, padding: { xs: 1, md: 1.5 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton variant="rectangular" width={20} height={20} /> {/* Checkbox */}
                  <Skeleton animation="wave" height={20} width="50%" /> {/* One Span */}
                </Box>
              </TableCell>

              {/* Second Column (30%) */}
              <TableCell sx={{ width: { xs: "30%", md: "30%" }, padding: { xs: 1, md: 0 } }}>

              </TableCell>

              {/* Last Column */}
              <TableCell sx={{ width: "10%", padding: { xs: 1, md: 0 } }}>

              </TableCell>
            </TableRow>
          </TableHead>


          {/* Table Body */}
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* First Column (70% - Checkbox + 3 Spans) */}
                <TableCell sx={{ width: { xs: "70%", md: "70%" }, padding: { xs: 2, md: 1.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="rectangular" width={20} height={20} /> {/* Checkbox */}
                    <Skeleton animation="wave" height={20} width="50%" /> {/* Main Text */}
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Skeleton animation="wave" height={15} width="20%" />
                    <Skeleton animation="wave" height={15} width="20%" />
                    <Skeleton animation="wave" height={15} width="20%" />
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Skeleton animation="wave" height={30} width="20%" />

                  </Box>
                </TableCell>

                {/* Second Column (30% - Text) */}
                <TableCell sx={{ width: { xs: "30%", md: "30%" }, padding: { xs: 2, md: 3 } }}>
                  <Skeleton animation="wave" height={20} width="80%" />
                </TableCell>

                {/* Last Column (Icons) */}
                <TableCell sx={{ width: "10%", padding: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton variant="reactangular" width={25} height={25} />
                    <Skeleton variant="reactangular" width={25} height={25} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};

export default CartSkeleton;

