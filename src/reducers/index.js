import { combineReducers } from 'redux';
import tales from './tales';
import lobby from './lobby';


const reducers = combineReducers({
  tales,
  lobby,
});

export default reducers;
