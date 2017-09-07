export const clickButton = (index, symbol) => {
  return {
    type: 'CLICK_BUTTON',
    index,
    symbol,
  };
};

export const confirmed = (roomId) => {
  return {
    type: 'CONFIRMED',
    roomId,
  };
};

export const connected = () => {
  return {
    type: 'CONNECTED',
  };
};

export const enemyTurn = (table) => {
  return {
    type: 'ENEMY_TURN',
    table,
  };
};

export const finishTurn = (socket, table) => {
  socket.emit('turn', table);
  return {
    type: 'FINISH_TURN',
    table,
  };
};

export const firstTurn = () => {
  return {
    type: 'FIRST_TURN',
  };
};

export const initSocket = (socket) => {
  return {
    type: 'INIT_SOCKET',
    socket,
  };
};

export const setWinner = (message) => {
  return {
    type: 'SET_WINNER',
    message,
  };
};

export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username,
  };
};

export const symbol = (sym, message) => {
  return {
    type: 'SYMBOL',
    sym,
    message,
  };
};

export const undo = (turn) => {
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
};

export const unsubscribed = () => {
  return {
    type: 'UNSUBSCRIBED',
  };
};

export const update = (howMany) => {
  return {
    type: 'UPDATE',
    howMany,
  };
};

