import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const PersonalDetails = ({ config, data }) => {
  return (
    <Grid container spacing={3}>
      {config.map(({ fieldName, displayHeader }) => (
        <Grid
          key={fieldName}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          className="personal-details-grid"
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "#555",
              marginBottom: "8px",
            }}
          >
            {displayHeader}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              color: data[fieldName] ? "#333" : "#888",
            }}
          >
            {data[fieldName] || "N/A"}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonalDetails;
