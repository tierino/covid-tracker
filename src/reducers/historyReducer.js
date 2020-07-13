import _ from "lodash";
import { FETCH_HISTORY } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_HISTORY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
