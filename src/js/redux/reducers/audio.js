import { actionTypes as types } from '../constants';

const initialState = {
  audio: '',
};
const audio = (state = initialState, action) => {
  switch (action.type) {
  case types.GET_TTS_DATA:
    return {...state, audio: action.data};
  default:
    return state;
  }
};

export default audio;