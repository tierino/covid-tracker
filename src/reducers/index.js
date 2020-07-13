import { combineReducers } from "redux";

import currentStatsReducer from "./currentStatsReducer";
import countryReducer from "./countryReducer";
import countriesReducer from "./countriesReducer";
import historyReducer from "./historyReducer";

export default combineReducers({
  currentStats: currentStatsReducer, // Next 10 matches
  selectedCountry: countryReducer,
  countries: countriesReducer,
  lastWeekStats: historyReducer,
});
