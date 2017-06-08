import { actionTypes as types } from '../constants';

const search = (state = {}, action) => {
  switch (action.type) {
  case types.SEARCH_SUCCESS:
    return action.data;
  case types.SEARCH_FAILURE:
    return {};
  default:
    return state;
  }
};

export default search;
