import { actionTypes as types, urls } from '../constants';
import { post, get, synthesize } from '../helpers';
import request from 'superagent';
import axios from 'axios';
import _ from 'lodash';

export const login = ({ email, password }) => dispatch => {
  const data = {
    email,
    password,
  };

  dispatch({ type: types.LOGIN_REQUEST, data});
  post({
    url: urls.LOGIN,
    body: { email, password },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  });
};

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.loginDetail;

  if (_.isEmpty(token)) return;
  const data = token;
  dispatch({ type: types.LOGIN_REQUEST, data });
  post({
    url: urls.LOGIN,
    body: token ,
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


export const getVision = (body) => dispatch => {
  dispatch({ type: types.VISION_REQUEST });
  post({
    url: urls.VISIONAPI,
    body: body,
    success: types.VISION_SUCCESS,
    failure: types.VISION_FAILURE,
    dispatch,
  });
};

export const getImageUrl = (body) => dispatch => {
  dispatch({ type: types.GET_IMAGE_URL, body });
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

export const uploadAzure = (file) => dispatch => {
  dispatch({ type: types.DROPZONE_REQUEST});
  const req = request.post('http://fedexovergoodservices.azurewebsites.net/api/Upload/user/PostUserImage');
  req.attach(file.name, file);
  req.end((err, res) => {
    if (res) {
      const data = JSON.parse(res.text);
      dispatch({ type: types.DROPZONE_SUCCESS, data});
    } else if (err) {
      dispatch({ type: types.DROPZONE_ERROR, err});
    }
  });
};


export const ocrVision = (body) => dispatch => {
  dispatch({ type: types.OCR_VISION_REQUEST });
  post({
    url: urls.OCRVISIONAPI,
    body: body,
    success: types.OCR_VISION_SUCCESS,
    failure: types.OCR_VISION_FAILURE,
    dispatch,
  });
};

export const handWrittenVision = (body) => dispatch => {
  dispatch({ type: types.HAND_VISION_REQUEST });
  post({
    url: urls.HANDWRITTENVISIONAPI,
    body: body,
    success: types.HAND_VISION_SUCCESS,
    failure: types.HAND_VISION_FAILURE,
    dispatch,
  });
};

export const goToDropZonePage = () => dispatch => {
  dispatch({ type: types.SHOW_DROPZONE_PAGE});
};

export const clearAll = () => dispatch => {
  dispatch({ type: types.CLEAR_ALL});
};



export const saveToCosmosDB = (body) => dispatch => {
  dispatch({ type: types.SAVE_COSMOS_DB_REQUEST });
  post({
    url: 'http://fedexovergoodservices.azurewebsites.net/api/Overgood/Create',
    body: body,
    success: types.SAVE_COSMOS_DB_SUCCESS,
    failure: types.SAVE_COSMOS_DB_FALIURE,
    dispatch,
  });
};


export const onSearch = (url) => dispatch => {
  dispatch({ type: types.ON_SEARCH_REQUEST});
  
  axios.get(url)
  .then(response => {
    dispatch({ type: types.ON_SEARCH_SUCCESS, response});
  });

};

export const clearSearch = () => dispatch => {
  dispatch({ type: types.ON_CLEAR_SEARCH });
};

export const showVisionPage = (data) => dispatch => {
  dispatch({ type: types.SHOW_VISION_DETAILS, data });
};

export const hideVisionPage = () => dispatch => {
  dispatch({ type: types.HIDE_VISION_DETAILS });
};

export const customVision = (url) => dispatch => {
  dispatch({ type: types.CUSTOM_VISION_REQUEST });
  post({
    url: url,
    success: types.CUSTOM_VISION_SUCCESS,
    failure: types.CUSTOM_VISION_FAILURE,
    dispatch,
  });
};

export const BingSearch = (url) => dispatch => {
  dispatch({ type: types.BING_SEARCH_REQUEST});
  get({
    url: url,
    success: types.BING_SEARCH_SUCCESS,
    failure: types.BING_SEARCH_FAILURE,
    dispatch,
  });
};

export const LuisSearch = (url) => dispatch => {
  dispatch({ type: types.LUIS_SEARCH_REQUEST});
  get({
    url: url,
    success: types.LUIS_SEARCH_SUCCESS,
    failure: types.LUIS_SEARCH_FAILURE,
    dispatch,
  });
};

// https://fedexovergoods.search.windows.net/indexes/overgood/docs?api-version=2016-09-01&search=water&highlight=captions&suggesterName=sg&fuzzy=false&api-key=C4FBD0A95D9184A1C7EB40C8D884F5B4

// https://fedexovergoods.search.windows.net/indexes/overgood/docs?api-version=2016-09-01&search=water&$orderby=confidence asc&highlight=captions&api-key=C4FBD0A95D9184A1C7EB40C8D884F5B4

// https://fedexovergoods.search.windows.net/indexes/overgood/docs?api-version=2016-09-01&search=water&$orderby=confidence desc&highlight=captions&api-key=C4FBD0A95D9184A1C7EB40C8D884F5B4


export const getTTS = (token, text) => dispatch => {
  dispatch({ type: types.TTS_AUDIO_TEXT, text});
  synthesize({
    token,
    text,
    success: types.GET_TTS_DATA,
    dispatch,
  });
};

export const callBotApi = (url) => dispatch => {
  dispatch({ type: types.BOT_REQUEST });
  get({
    url: url,
    success: types.BOT_SUCCESS,
    failure: types.BOT_FAILURE,
    dispatch,
  });
};


export const stopbot = () => dispatch => {
  dispatch({type: types.STOP_BOT});
};

export const PageDisplayModal = () => dispatch => {
  dispatch({ type: types.SHOW_PageDisplay_Modal});
};
export const PageDisplayDropPage = () => dispatch => {
  dispatch({ type: types.SHOW_PageDisplay_DropPage});
};
export const PageDisplayBingPage = () => dispatch => {
  dispatch({ type: types.SHOW_PageDisplay_BingPage});
};
export const PageDisplayBingPageandModal = () => dispatch => {
  dispatch({ type: types.SHOW_PageDisplay_BingPageAndModal});
};