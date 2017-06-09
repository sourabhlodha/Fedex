import { combineReducers } from 'redux';

import user from './user';
import search from './search';
import visionsearch from './visionsearch';
const rootReducer = combineReducers({
  user,
  search,
  visionsearch,
});

export default rootReducer;
