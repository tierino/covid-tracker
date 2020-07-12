import _ from "lodash";
import { SET_COUNTRY } from "../actions/types";

export default (state = "Australia", action) => {
  switch (action.type) {
    case SET_COUNTRY:
      return action.payload;
    default:
      return state;
  }
};
