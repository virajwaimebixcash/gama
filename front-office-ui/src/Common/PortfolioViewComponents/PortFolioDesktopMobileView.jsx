import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const PortFolioDesktopMobileView = ({
  groupFields,
  groupName,
  groupIndex,
  detailViewValues,
  dataGroup,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screen
  const { t } = useTranslation();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  return (
    <>
      {isMobile ? (
        <Grid container spacing={2}>
          {groupFields.map((field, fieldIndex) => {
            const fieldLabel = field.displayName || field.fieldName; // Use displayName if available, otherwise fieldName
            return (
              <Grid key={fieldIndex} className="minhegt50" item xs={12}>
                <p className="lbltxt">{fieldLabel}</p>
                {detailViewValues[dataGroup]?.length > 0 ? (
                  detailViewValues[dataGroup].map((data, rowIndex) => (
                    <Grid
                      key={rowIndex}
                      className="minhegt50"
                      item
                      xs={6}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <label className="lbltxt">
                        {data[field.fieldName] || "-"}
                      </label>
                    </Grid>
                  ))
                ) : (
                  <Grid className="minhegt50" item xs={6} sm={6} md={4} lg={3}>
                    <label className="lbltxt">
                      {detailViewValues[field.fieldName] || "-"}
                    </label>
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <>
          {" "}
          {dataGroup ? (
            <TableContainer component={Paper}>
              <Table className="maintabldata">
                <TableHead>
                  <TableRow>
                    {groupFields.map((field, index) => {
                      const fieldLabel = field.displayName || field.fieldName; // Use displayName if available, otherwise fieldName
                      return (
                        <TableCell key={index}>
                          <p>{t(fieldLabel)}</p>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(dataGroup && detailViewValues[dataGroup]?.length > 0
                    ? detailViewValues[dataGroup]
                    : [{}]
                  ).map((data, index) => (
                    <TableRow key={index}>
                      {groupFields.map((field, fieldIndex) => (
                        <TableCell key={fieldIndex}>
                          <p>{data[field.fieldName] || "-"}</p>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>
              <Grid container spacing={2}>
                {groupFields.map((field, fieldIndex) => (
                  <Grid
                    key={fieldIndex}
                    size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
                    className="minhegt50"
                  >
                    <p>{field.displayName || field.fieldName}</p>
                    <label className="lbltxt">
                      {detailViewValues[field.fieldName] || "-"}
                    </label>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PortFolioDesktopMobileView;
