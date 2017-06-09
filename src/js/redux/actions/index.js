import { actionTypes as types, urls } from '../constants';
import { post,get } from '../helpers';


export const login = ({ email, password }) => dispatch => {
  dispatch({ type: types.LOGIN_REQUEST });
  post({
    url: urls.LOGIN,
    body: { email, password },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  });
};

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.token;

  if (typeof token === 'undefined') return;

  dispatch({ type: types.LOGIN_REQUEST });
  post({
    url: urls.LOGIN_WITH_TOKEN,
    body: { token },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  });
};

export const searchAssets = ({ searchText }) => dispatch => {
  dispatch({ type: types.SEARCH_REQUEST });
  post({
    url: urls.CREATE,
    body: searchText ,
    success: types.SEARCH_SUCCESS,
    failure: types.SEARCH_FAILURE,
    dispatch,
  });
};


export const vision = ({ imageurl }) => dispatch => {
  dispatch({ type: types.VISION_REQUEST });
  post({
    url: urls.VISIONAPI,
    body: {'url':imageurl},
    success: types.VISION_SUCCESS,
    failure: types.VISION_FAILURE,
    dispatch,
  });
};

export const getImageList = () => dispatch => {
  dispatch({ type: types.IMAGE_REQUEST});
  get({
    url: urls.IMAGELIST,
    success: types.IMAGE_SUCCESS,
    failure: types.IMAGE_FAILURE,
    dispatch,
  });
};