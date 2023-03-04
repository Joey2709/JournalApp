import { CircularProgress, Grid } from "@mui/material";

const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", p: 4 }}
    >
      <Grid item justifyContent="center">
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};

export default CheckingAuth;
