import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import numeral from "numeral";

import { fetchHistory } from "../actions";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

import { faChartLine } from "@fortawesome/free-solid-svg-icons";
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
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  loaderContainer: {
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },
  textWithIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Progression(props) {
  const classes = useStyles();

  useEffect(() => {
    props.fetchHistory(props.selectedCountry, dateOneWeekAgo());
  }, [props.selectedCountry]);

  const dateOneWeekAgo = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return moment(oneWeekAgo).format("YYYY-MM-DD");
  };

  const renderStatsComparison = () => {
    let activeCasesDifference =
      props.curStats.cases.active - props.lastWeekStats.cases.active;

    console.log(activeCasesDifference);

    // MORE CASES THAN LAST WEEK
    if (activeCasesDifference > 0) {
      return (
        <div>
          <Typography>
            <div className={classes.textWithIcon}>
              <SentimentVeryDissatisfiedIcon style={{ marginRight: "4px" }} />{" "}
              Doing worse than last week There are:
            </div>
          </Typography>
          <Typography
            variant="h5"
            className={classes.subheading}
            color="secondary"
          >
            <div className={classes.textWithIcon}>
              {numeral(activeCasesDifference).format("0,0")}
              <ArrowUpwardIcon />
            </div>
          </Typography>
          <Typography>
            ...more active cases than this time last week. That's a{" "}
            {numeral(
              (activeCasesDifference / props.lastWeekStats.cases.active) * 100
            ).format("0.00")}
            % increase in active cases.
          </Typography>
        </div>
      );
      // LESS CASES THAN LAST WEEK
    } else if (activeCasesDifference < 0) {
      activeCasesDifference *= -1;
      return (
        <div>
          <Typography>
            <div className={classes.textWithIcon}>
              <SentimentVerySatisfiedIcon style={{ marginRight: "4px" }} />
              Doing better than last week. There are:
            </div>
          </Typography>
          <Typography
            variant="h5"
            className={classes.subheading}
            style={{ color: "#64dd17" }}
          >
            <div className={classes.textWithIcon}>
              {numeral(activeCasesDifference).format("0,0")}
              <ArrowDownwardIcon />
            </div>
          </Typography>
          <Typography>
            ...less active cases than this time last week. That's a{" "}
            {numeral(
              (activeCasesDifference / props.lastWeekStats.cases.active) * 100
            ).format("0.00")}
            % decrease in active cases.
          </Typography>
        </div>
      );
      // SAME CASES AS LAST WEEK
    } else {
      return (
        <div>
          <Typography className={classes.subheading}>
            There are the same amount of active cases as this time last week.
          </Typography>
        </div>
      );
    }
  };

  return (
    <Accordion variant="outlined">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <FontAwesomeIcon className={classes.icon} icon={faChartLine} />
          PROGRESSION
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.lastWeekStats.cases ? (
          renderStatsComparison()
        ) : (
          <Container className={classes.loaderContainer}>
            <CircularProgress />
          </Container>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

function mapStateToProps(state) {
  return {
    selectedCountry: state.selectedCountry,
    curStats: state.currentStats,
    lastWeekStats: state.lastWeekStats,
  };
}

export default connect(mapStateToProps, { fetchHistory })(Progression);
