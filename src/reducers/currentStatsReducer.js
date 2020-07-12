import _ from "lodash";
import { FETCH_CUR_STATS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CUR_STATS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
