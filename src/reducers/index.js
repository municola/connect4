import { combineReducers } from 'redux';
import game from './game';
import socket from './socket';


const reducers = combineReducers({
  game,
  socket,
});

export default reducers;
