import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import numeral from "numeral";
import PropTypes from "prop-types";
import { compose } from "redux";

import { fetchCurStats, setCountry } from "../actions";
import Population from "./Population";
import Testing from "./Testing";
import Progression from "./Progression";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import withWidth from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  mainGrid: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(10),
    },
    marginTop: theme.spacing(12),
    textAlign: "center",
  },
  statsContainer: {
    padding: 0,
  },
  statsHeader: {
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  caption: {
    color: "grey",
  },
  progress: {
    marginTop: theme.spacing(24),
    marginBottom: theme.spacing(12),
  },
}));

function CurrentStats(props) {
  const classes = useStyles();
  const { width } = props;

  useEffect(() => {
    props.fetchCurStats(props.selectedCountry);
  }, [props.selectedCountry]);

  console.log(props.curStats);

  return props.curStats.cases ? (
    <Grid className={classes.mainGrid} item md={7} sm={10} xs={12}>
      <Container className={classes.statsContainer}>
        <Container className={classes.statsHeader}>
          <Typography variant="caption" className={classes.caption}>
            {moment(Date.now()).format("MMM D YYYY")}
          </Typography>
          <Grid
            container
            spacing={1}
            direction={width === "xs" ? "column" : "row"}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <Typography variant={width === "xs" ? "h3" : "h4"}>
                {numeral(props.curStats.cases.total).format("0,0")}
              </Typography>
              <Typography variant="subtitle2">TOTAL CASES</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                color="secondary"
                variant={width === "xs" ? "h2" : "h3"}
              >
                {numeral(props.curStats.cases.active).format("0,0")}
              </Typography>
              <Typography variant="subtitle1">ACTIVE CASES </Typography>
              <Typography variant="caption" className={classes.caption}>
                {numeral(props.curStats.cases.new).format("+0,0")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant={width === "xs" ? "h3" : "h4"}>
                {numeral(props.curStats.deaths.total).format("0,0")}{" "}
              </Typography>
              <Typography variant="subtitle2">TOTAL DEATHS</Typography>
              <Typography variant="caption" className={classes.caption}>
                {numeral(props.curStats.deaths.new).format("+0,0") || "+0"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <div className={classes.root}>
          <Population curStats={props.curStats} />
          <Testing curStats={props.curStats} />
          <Progression curStats={props.curStats} />
        </div>
      </Container>
    </Grid>
  ) : (
    <Box position="relative" display="inline-flex">
      <CircularProgress className={classes.progress}></CircularProgress>
    </Box>
  );
}

CurrentStats.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

function mapStateToProps(state) {
  return {
    selectedCountry: state.selectedCountry,
    curStats: state.currentStats,
  };
}

export default compose(
  withWidth(),
  connect(mapStateToProps, { fetchCurStats, setCountry })
)(CurrentStats);
