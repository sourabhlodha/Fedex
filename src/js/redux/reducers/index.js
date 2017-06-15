import { combineReducers } from 'redux';

import user from './user';
import search from './search';
import imagelist from './imagelist';
import dropzone from './dropzone';
import luissearch from './luissearch';

const rootReducer = combineReducers({
  user,
  search,
  imagelist,
  dropzone,
  luissearch,
});

export default rootReducer;
