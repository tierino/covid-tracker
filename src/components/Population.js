import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import numeral from "numeral";

import { fetchCurStats } from "../actions";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import PieChartIcon from "@material-ui/icons/PieChart";

import { faChartPie } from "@fortawesome/free-solid-svg-icons";
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
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
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
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function Population(props) {
  const classes = useStyles();

  let percentageActive =
    (props.curStats.cases.active / props.curStats.cases.total) * 100;
  let percentageRecovered =
    (props.curStats.cases.recovered / props.curStats.cases.total) * 100;
  let percentageDead =
    (props.curStats.deaths.total / props.curStats.cases.total) * 100;

  return (
    <Accordion variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <FontAwesomeIcon className={classes.icon} icon={faChartPie} />
          BREAKDOWN
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">
          Breakdown of total {numeral(props.curStats.cases.total).format("0,0")}{" "}
          recorded cases:
        </Typography>
        <Container className={classes.bar}>
          <Tooltip arrow title={props.curStats.cases.active} placement="top">
            <Box
              width={`${percentageActive}%`}
              bgcolor="secondary.main"
              p={1}
              my={0.5}
            ></Box>
          </Tooltip>
          <Tooltip arrow title={props.curStats.cases.recovered} placement="top">
            <Box
              width={`${percentageRecovered}%`}
              bgcolor="primary.main"
              p={1}
              my={0.5}
            ></Box>
          </Tooltip>
          <Tooltip arrow title={props.curStats.deaths.total} placement="top">
            <Box
              width={`${percentageDead}%`}
              bgcolor="text.primary"
              p={1}
              my={0.5}
            ></Box>
          </Tooltip>
        </Container>
        <Container className={classes.labels}>
          <Typography variant="subtitle2" color="secondary">
            Active
          </Typography>
          <Typography variant="subtitle2" color="primary">
            Recovered
          </Typography>
          <Typography variant="subtitle2">Deceased</Typography>
        </Container>
        <div className={classes.subheading}>
          <Typography
            className={classes.subheading}
            variant="h5"
            color="secondary"
          >
            {numeral(
              (props.curStats.cases.total / props.curStats.population) * 100
            ).format("0.00")}
            %
          </Typography>
          <Typography variant="body1">
            ...of this country's population have tested positive for COVID-19.
          </Typography>
        </div>
        <div className={classes.subheading}>
          <Typography variant="h5" color="secondary">
            {numeral(
              (props.curStats.deaths.total / props.curStats.cases.total) * 100
            ).format("0.00")}
            %
          </Typography>
          <Typography variant="body1">
            ...of COVID-19 patients in this country have died.
          </Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default connect(null)(Population);
