import { actionTypes as types } from '../constants';

const initialState = {
  audio: '',
  audiotext: '',
  intent: {},
  botFetching: false,
  botFetched: false,
  botErr: '',
  stopBot: false,
};
const audio = (state = initialState, action) => {
  switch (action.type) {
  case types.GET_TTS_DATA:
    return {...state, audio: action.data, botFetched: false, intent: {}, stopBot: false };
  
  case types.TTS_AUDIO_TEXT:
    return {...state, audiotext: action.text, stopBot: false};
  
  case types.BOT_REQUEST:
    return {...state, botFetching: true, audiotext: '', audio: '' };

  case types.BOT_SUCCESS:
    return {
      ...state,
      botFetching: false,
      botFetched: true,
      intent: action.data,
    };
    
  case types.BOT_FAILURE:
    return {...state, botFetching: false, botErr: action.data};
  
  case types.STOP_BOT: 
    return {
      ...state,
      botFetching: false,
      botFetched: false,
      intent: {},
      stopBot: true,
    };

  default:
    return state;
  }
};

export default audio;