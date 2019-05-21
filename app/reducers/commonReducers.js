import merge from "lodash/merge";
import isEmpty from "lodash/isEmpty";

export const entities = (state = {}, action) => {
  if (!isEmpty(action.entities)) {
    return merge({}, state, action.entities);
  }
  return state;
};
