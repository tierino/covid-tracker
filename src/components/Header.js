import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import { setCountry, fetchCountries } from "../actions";
import covidApi from "../apis/covidApi";
import apiHeaders from "../apis/apiHeaders";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#212121",
  },
  headerButtonContainer: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  headerTextContainer: {
    textAlign: "center",
    paddingTop: theme.spacing(1),
  },
  headerText: {
    color: "white",
  },
  buttonHelper: {
    fontSize: "10px",
    color: "grey",
  },
  button: {
    color: "white",
    "&:hover": {
      backgroundColor: "#424242",
    },
  },
}));

function Header(props) {
  const classes = useStyles();

  useEffect(() => {
    props.fetchCountries();
  }, []);

  // MENU STATE & EVENTS

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuSelect = (country) => {
    setAnchorEl(null);
    props.setCountry(country);
    handleSnackbarOpen();
  };

  const handleMenuClose = (country) => {
    setAnchorEl(null);
  };

  // SNACKBAR STATE & EVENTS

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <AppBar className={classes.header}>
        <Toolbar style={{ flexDirection: "column" }}>
          <Container className={classes.headerTextContainer}>
            <Typography className={classes.buttonHelper} variant="caption">
              SELECT A COUNTRY
            </Typography>
          </Container>
          <Container className={classes.headerButtonContainer}>
            <Button
              size="large"
              fullWidth={false}
              className={classes.button}
              startIcon={<LanguageIcon className={classes.headerText} />}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuButtonClick}
            >
              {props.selectedCountry}
            </Button>
            <Menu
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              id="long-menu"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "30ch",
                },
              }}
            >
              {props.countryList.map((country) => {
                return (
                  <MenuItem
                    key={country}
                    onClick={() => handleMenuSelect(country)}
                  >
                    {country}
                  </MenuItem>
                );
              })}
            </Menu>
          </Container>
        </Toolbar>
      </AppBar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={`Set country to ${props.selectedCountry}`}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={handleSnackbarClose}
            ></Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedCountry: state.selectedCountry,
    countryList: Array.from(state.countries),
  };
}

export default connect(mapStateToProps, { setCountry, fetchCountries })(Header);
