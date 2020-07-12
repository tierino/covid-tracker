import React, { useEffect } from "react";
import { connect } from "react-redux";
import numeral from "numeral";

import { fetchCurStats } from "../actions";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";

import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    flexDirection: "column",
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  labels: {
    display: "flex",
    padding: 0,
    justifyContent: "space-between",
  },
  bar: {
    display: "flex",
    padding: 0,
  },
  subheading: {
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function Testing(props) {
  const classes = useStyles();

  let percentageTested = numeral(
    (props.curStats.tests.total / props.curStats.population) * 100
  ).format("0.00");

  let percentagePositive = numeral(
    (props.curStats.cases.total / props.curStats.tests.total) * 100
  ).format("0.00");

  return (
    <Accordion variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <FontAwesomeIcon className={classes.icon} icon={faFlask} />
          TESTING
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Proportion of population who have received tests:
        </Typography>
        <Container className={classes.bar}>
          <Tooltip arrow title={props.curStats.tests.total} placement="top">
            <Box
              width={`${percentageTested}%`}
              bgcolor="primary.main"
              p={1}
              my={0.5}
            ></Box>
          </Tooltip>
          <Tooltip arrow title={props.curStats.population} placement="top">
            <Box
              width={`${100.0 - percentageTested}%`}
              bgcolor="black"
              p={1}
              my={0.5}
            ></Box>
          </Tooltip>
        </Container>
        <Container className={classes.labels}>
          <Typography variant="subtitle2" color="primary">
            Tested
          </Typography>
          <Typography variant="subtitle2">Untested</Typography>
        </Container>
        <div className={classes.subheading}>
          <Typography color="primary" variant="h5">
            {numeral(props.curStats.tests.total).format("0,0")}
          </Typography>
        </div>
        <Typography>
          ...people have been tested for COVID-19. That's{" "}
          {numeral(
            (props.curStats.tests.total / props.curStats.population) * 100
          ).format("0.00")}
          % of the population.
        </Typography>
        <div className={classes.subheading}>
          <Typography color="primary" variant="h5">
            {percentagePositive}%
          </Typography>
          <Typography>...of all tests have returned positive.</Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default connect(null)(Testing);
