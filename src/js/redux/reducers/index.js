import { combineReducers } from 'redux';

import user from './user';
import search from './search';
import imagelist from './imagelist';
import dropzone from './dropzone';
import luissearch from './luissearch';
import audio from './audio';

const rootReducer = combineReducers({
  user,
  search,
  imagelist,
  dropzone,
  luissearch,
  audio,
});

export default rootReducer;
