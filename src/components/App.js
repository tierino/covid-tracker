import React from "react";

import CurrentStats from "./CurrentStats";
import Header from "./Header";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  infoContainer: {
    textAlign: "center",
  },
  info: {
    color: "grey",
  },
}));

export default ({ children }) => {
  const classes = useStyles();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "light",
          button: "#212121",
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid className={classes.root} container spacing={2}>
        <CurrentStats />
      </Grid>
      <Container className={classes.infoContainer}>
        <Typography className={classes.info} variant="caption">
          Data provided by api-sports. Updates every 15 minutes.
          <br /> Note: some countries may have incomplete/missing data on this
          API.
        </Typography>
      </Container>
    </ThemeProvider>
  );
};
