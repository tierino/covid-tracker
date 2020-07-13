import covidApi from "../apis/covidApi.js";
import apiHeaders from "../apis/apiHeaders";

import {
  FETCH_CUR_STATS,
  SET_COUNTRY,
  FETCH_COUNTRIES,
  FETCH_HISTORY,
} from "./types";

export const fetchCurStats = (country) => async (dispatch) => {
  const response = await covidApi.get("/statistics", {
    params: {
      country: country,
    },
    headers: apiHeaders,
  });

  dispatch({ type: FETCH_CUR_STATS, payload: response.data.response[0] });
};

export const fetchCountries = () => async (dispatch) => {
  const response = await covidApi.get("/countries", {
    headers: apiHeaders,
  });

  dispatch({ type: FETCH_COUNTRIES, payload: response.data.response });
};

export const fetchHistory = (country, date) => async (dispatch) => {
  console.log(country);
  console.log(date);

  const response = await covidApi.get("/history", {
    params: {
      country: country,
      day: date,
    },
    headers: apiHeaders,
  });

  console.log(response);

  dispatch({ type: FETCH_HISTORY, payload: response.data.response[0] });
};

export const setCountry = (country) => {
  return { type: SET_COUNTRY, payload: country };
};
