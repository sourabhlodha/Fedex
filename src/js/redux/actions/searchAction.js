import { actionTypes as types } from '../constants';

export const getSearchList = () => dispatch => {
  dispatch({ type: types.SEARCH_LIST_REQUEST })
  get({
    url: urls.SEARCHLIST,
    success: types.SEARCH_LIST_SUCCESS,
    failure: types.SEARCH_LIST_FAILURE,
    dispatch,
  })
};
