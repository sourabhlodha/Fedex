import { combineReducers } from 'redux';

import user from './user';
import search from './search';
import visionsearch from './visionsearch';
import imagelist from './imagelist';
const rootReducer = combineReducers({
  user,
  search,
  visionsearch,
  imagelist,
});

export default rootReducer;
