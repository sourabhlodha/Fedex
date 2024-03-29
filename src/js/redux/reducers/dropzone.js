import { actionTypes as types } from '../constants';

const initialState = {
  
  imageUrl: '',

  dropzoneImgUrl: '',
  fetching: false,
  fetched: false,
  err: '',

  visionList: '',
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

  cosmosFetching: false,

  CustomVisionList: {},
  CustomFetching: false,
  CustomFetched: false,
  CustomErr: '',

  BingSearchList: '',
  BingSearchFetching: false,
  BingSearchFetched: false,
  BingErr: '',

};
const dropzone = (state = initialState, action) => {
  switch (action.type) {
  
  case types.CLEAR_ALL:
    return { ...state, 
      imageUrl: '',
      dropzoneImgUrl: '',
      fetching: false,
      fetched: false,
      err: '',

      visionList: '',
      visionFetching: false,
      visionFetched: false,
      visionErr: '',

      cosmosFetching: false,

      CustomVisionList: {},
      CustomFetching: false,
      CustomFetched: false,
      CustomErr: '',

      BingSearchList: '',
      BingSearchFetching: false,
      BingSearchFetched: false,
      BingErr: '',
      
    };

  case types.DROPZONE_REQUEST :
    return {...state, fetching: true, visionFetched: false, visionFetching: false, ocrFetched: false, ocrFetching: false, handFetched: false, handFetching: false};
  
  case types.DROPZONE_SUCCESS:
    return {
      ...state,
      fetching: false,
      fetched: true,
      dropzoneImgUrl: action.data.Message,
    };
  case types.DROPZONE_ERROR:
    return {...state, fetching: false, err: action.data};

  case types.GET_IMAGE_URL:
    return {...state, imageUrl: action.body};

  case types.VISION_REQUEST:
    return {...state, visionFetching: true, fetched: false, fetching: false, ocrFetched: false, ocrFetching: false, handFetched: false, handFetching: false, dropzoneImgUrl: '', CustomFetching: false, CustomFetched: false};

  case types.VISION_SUCCESS:
    return {
      ...state,
      visionFetching: false,
      visionFetched: true,
      visionList: action.data,
    };
    
  case types.VISION_FAILURE:
    return {...state, visionFetching: false, visionErr: action.data};

  

  case types.OCR_VISION_REQUEST:
    return {...state, ocrFetching: true, fetched: false, fetching: false, dropzoneImgUrl: ''};

  case types.OCR_VISION_SUCCESS:
    return {
      ...state,
      ocrFetching: false,
      ocrFetched: true,
      ocrList: action.data,
    };
    
  case types.OCR_VISION_FAILURE:
    return {...state, ocrFetching: false, ocrErr: action.data};

  
  case types.HAND_VISION_REQUEST:
    return {...state, handFetching: true, fetched: false, fetching: false, dropzoneImgUrl: ''};

  case types.HAND_VISION_SUCCESS:
    return {
      ...state,
      handFetching: false,
      handFetched: true,
      handList: action.data,
    };
    
  case types.HAND_VISION_FAILURE:
    return {...state, handFetching: false, handErr: action.data};


  case types.SHOW_DROPZONE_PAGE:
    return {...state, visionFetched: false, visionFetching: false };
  

  case types.SAVE_COSMOS_DB_REQUEST:
    return {...state, cosmosFetching: true };
    
    
  case types.SAVE_COSMOS_DB_SUCCESS:
    return {...state, visionFetched: false, visionFetching: false ,
      BingSearchFetching: false,
      BingSearchFetched: true,
    };

  case types.CUSTOM_VISION_REQUEST:
    return {...state, CustomFetching: true, dropzoneImgUrl: '', fetched: false, fetching: false};

  case types.CUSTOM_VISION_SUCCESS:
    return {
      ...state,
      CustomFetching: false,
      CustomFetched: true,
      CustomVisionList: action.data,
    };

  case types.Custom_VISION_FAILURE:
    return {...state, CustomFetching: false, handErr: action.data};

  case types.BING_SEARCH_REQUEST:
    return {...state, BingSearchFetching: true, fetched: false, fetching: false};

  case types.BING_SEARCH_SUCCESS:
    return {
      ...state,
      BingSearchFetching: false,
      BingSearchFetched: true,
      BingSearchList: action.data,

      dropzoneImgUrl: '',
      fetching: false,
      fetched: false,
      err: '',

      visionList: '',
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

      cosmosFetching: false,

      CustomVisionList: {},
      CustomFetching: false,
      CustomFetched: false,
      CustomErr: '',
    };  
  case types.BING_SEARCH_FAILURE:
    return {...state, BingSearchFetching: false, handErr: action.data};

  

  default:
    return state;
  }
};

export default dropzone;
