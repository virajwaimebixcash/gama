import { useState } from "react";
import { Box, Button, Select, MenuItem, Typography } from "@mui/material";

const Pagination = ({ totalData, handlePagination, defaultPageSize }) => {
    const [page, setPage] = useState(1); 
    const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
    const totalRecords = totalData;        

    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    // Calculate the starting and ending record numbers
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, totalRecords);

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
        handlePagination(page - 1, rowsPerPage);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
        handlePagination(page + 1, rowsPerPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when rows per page changes
        handlePagination(1, parseInt(event.target.value, 10));
    };

    return (
        <Box
            sx={{
                flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                padding: 2,
                borderRadius: "8px",
                width: "100%",
                maxWidth: "700px",
                margin: "auto",
                marginTop: "10px",
            }}
        >
            {/* Previous Button */}
            <Button
                variant="contained"
                color="primary" className="netxprev nexprebutton"
                onClick={handlePrevious}
                disabled={page === 1}
            >
                Previous
            </Button>


            {/* Dropdown for Rows Per Page */}
            <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                displayEmpty
                sx={{
                    minWidth: "70px",
                    backgroundColor: "#fff", height: "28px",
                    borderRadius: "4px", marginLeft: "5px", marginRight: "5px",
                    border: "1px solid #ccc",
                    "&:hover": {
                        borderColor: "#1976d2",
                    },
                }}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
            </Select>

            {/* Next Button */}
            <Button
                variant="contained"
                color="primary" className="netxprev nexprebutton"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                Next
            </Button>
            {/* Record Information */}
            <Typography sx={{ fontSize: "16px", fontWeight: "bold", width: "100%" }}>
                Showing {startRecord}-{endRecord} of {totalRecords}
            </Typography>

        </Box>
    );
};

export default Pagination;
