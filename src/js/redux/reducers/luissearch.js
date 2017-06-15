import { actionTypes as types } from '../constants';

const initialState = {
  LuisList: '',
  Luisfetching: false,
  Luisfetched: false,
  err: '',
};
const LuisList = (state = initialState, action) => {
  switch (action.type) {
  case types.LUIS_SEARCH_REQUEST:
    return {...state, Luisfetching: true};
  case types.LUIS_SEARCH_SUCCESS:
    return {
      ...state,
      Luisfetching: false,
      Luisfetched: true,
      visionList: action.data,
    };
  case types.LUIS_SEARCH_FAILURE:
    return {...state, Luisfetching: false, err: action.data};
  default:
    return state;
  }
};

export default LuisList;
