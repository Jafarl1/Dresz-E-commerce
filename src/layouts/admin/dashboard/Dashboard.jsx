// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
import { Container, Paper, Grid } from "/src/styles/mui";
import Chart from "../Chart";
import Deposits from "../Deposits";

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
