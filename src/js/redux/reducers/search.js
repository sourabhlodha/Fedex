import { actionTypes as types } from '../constants';

const initialState = {
  searchResult: {},
  fetching: false,
  fetched: false,
  isvisionDetailPage: false,
  cosmosDB: {},
  err: '',

  dropzoneImgUrl: '',
  dzFetching: false,
  dzFetched: false,
  dzErr: '',

  visionList: {},
  visionFetching: false,
  visionFetched: false,
  visionErr: '',
 
  ocrList: {},
  ocrFetching: false,
  ocrFetched: false,
  ocrErr: '',
  
  handList: {},
  handFetching: false,
  handFetched: false,
  hand: '',
  uploadedImageUrl: '',
  callApi: false,

};

const search = (state = initialState, action) => {
  switch (action.type) {
  case types.ON_CLEAR_SEARCH:
    return {
      ...state,
      searchResult: {},
      fetching: false,
      fetched: false,
      isvisionDetailPage: false,
      cosmosDB: {},
      err: '',

      dropzoneImgUrl: '',
      dzFetching: false,
      dzFetched: false,
      dzErr: '',

      visionList: {},
      visionFetching: false,
      visionFetched: false,
      visionErr: '',
    
      ocrList: {},
      ocrFetching: false,
      ocrFetched: false,
      ocrErr: '',
      
      handList: {},
      handFetching: false,
      handFetched: false,
      hand: '',
      uploadedImageUrl: '',
      callApi: false,
      
    };
  case types.ON_SEARCH_REQUEST :
    return {...state, fetching: true, fetched: false, callApi: false, isvisionDetailPage: false, dropzoneImgUrl: '', visionList: {}, ocrList: {}, handList: {}};

  case types.ON_SEARCH_SUCCESS:
    return {
      ...state,
      fetching: false,
      fetched: true,
      callApi: false,
      searchResult: action.response.data,
    };
  case types.ON_SEARCH_FAILURE:
    return {...state, fetching: false, fetched: false, err: action.data};
  
  case types.SHOW_VISION_DETAILS: 
    return {...state, isvisionDetailPage: true, cosmosDB: action.data, dropzoneImgUrl: '', visionList: {}, ocrList: {}, handList: {}, callApi: false };

  case types.HIDE_VISION_DETAILS: 
    return {...state, isvisionDetailPage: false, cosmosDB: {} };

  case types.DROPZONE_REQUEST :
    return {...state, dzFetching: true, fetching: false, fetched: false, visionList: {}, ocrList: {}, handList: {}, callApi: false};
  
  case types.DROPZONE_SUCCESS:
    return {
      ...state,
      dzFetching: false,
      dzFetched: true,
      fetching: false, fetched: false,
      dropzoneImgUrl: action.data.Message,
      uploadedImageUrl: action.data.Message,
    };
  case types.DROPZONE_ERROR:
    return {...state, dzFetching: false, fetching: false, fetched: false, dzErr: action.data};
  
  case types.VISION_REQUEST:
    return {...state, visionFetching: true, fetching: false, fetched: false, dropzoneImgUrl: '', callApi: false };

  case types.VISION_SUCCESS:
    return {
      ...state,
      visionFetching: false,
      visionFetched: true,
      callApi: true,
      visionList: action.data,
      fetching: false, fetched: false,
    };
    
  case types.VISION_FAILURE:
    return {...state, visionFetching: false, fetching: false, fetched: false, visionErr: action.data};

  case types.OCR_VISION_REQUEST:
    return {...state, ocrFetching: true, fetching: false, fetched: false, dropzoneImgUrl: ''};

  case types.OCR_VISION_SUCCESS:
    return {
      ...state,
      ocrFetching: false,
      ocrFetched: true,
      callApi: true,
      ocrList: action.data,
      fetching: false, fetched: false,
    };
    
  case types.OCR_VISION_FAILURE:
    return {...state, ocrFetching: false, fetching: false, fetched: false, ocrErr: action.data};

  
  case types.HAND_VISION_REQUEST:
    return {...state, handFetching: true, fetching: false, fetched: false, dropzoneImgUrl: ''};

  case types.HAND_VISION_SUCCESS:
    return {
      ...state,
      handFetching: false,
      handFetched: true,
      callApi: true,
      handList: action.data,
      fetching: false, fetched: false,
    };
    
  case types.HAND_VISION_FAILURE:
    return {...state, handFetching: false, fetching: false, fetched: false, handErr: action.data};


  default:
    return state;
  }
};

export default search;