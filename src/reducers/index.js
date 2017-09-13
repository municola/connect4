import { combineReducers } from 'redux';
import game from './game';
import chat from './chat';


const reducers = combineReducers({
  game,
  chat,
});

export default reducers;
