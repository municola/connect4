import { setWinner as emitSetWinner, finishTurn as emitFinishTurn } from './socketio';

export function setUsername(username) {
  return {
    type: 'SET_USERNAME',
    username,
  };
}

export function setWinner(message) {
  emitSetWinner();
  return {
    type: 'SET_WINNER',
    message,
  };
}

export function finishTurn(table) {
  emitFinishTurn(table);
  return {
    type: 'FINISH_TURN',
    table,
  };
}

export function clickButton(index, symbol) {
  return {
    type: 'CLICK_BUTTON',
    index,
    symbol,
  };
}

export function undo(turn) {
  if (turn === 1) {
    return {
      type: 'UNDO',
      turn: 0,
    };
  }
  return {
    type: 'UNDO',
    turn: 1,
  };
}

export function gameStartMessage() {
  return {
    type: 'GAME_START_MESSAGE',
  };
}

export function leave() {
  return {
    type: 'LEAVE',
  };
}
