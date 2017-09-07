import { combineReducers } from 'redux';
import game from './game';
import socket from './socket';
import chat from './chat';


const reducers = combineReducers({
  game,
  socket,
  chat,
});

export default reducers;
