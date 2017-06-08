import { actionTypes as types } from '../constants';

const initialState = {
  searchList: '',
  fetching: false,
  fetched: false,
  err: ''
}

const searchList = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_LIST_REQUEST:
      return {...state, fetching: true}
    case types.SEARCH_LIST_SUCCESS:
      return {
          ...state,
          fetching: false,
          fetched: true,
          searchList: action.data,
        }
    case types.SEARCH_LIST_FAILURE:
      return {...state, fetching: false, err: action.data}
    default:
      return state
  }
}

export default searchList;