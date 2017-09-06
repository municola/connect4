export const clickButton = (index, symbol) => {
  return {
    type: 'CLICK_BUTTON',
    index,
    symbol,
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

export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username,
  };
};

export const initSocket = (socket) => {
  return {
    type: 'INIT_SOCKET',
    socket,
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

export const enemyTurn = (table) => {
  return {
    type: 'ENEMY_TURN',
    table,
  };
};

export const symbol = (sym, message) => {
  return {
    type: 'SYMBOL',
    sym,
    message,
  };
};

export const confirmed = (roomId) => {
  return {
    type: 'CONFIRMED',
    roomId,
  };
};

export const connected = () => {
  console.log('action');
  return {
    type: 'CONNECTED',
  };
};

export const update = (howMany) => {
  return {
    type: 'UPDATE',
    howMany,
  };
};

export const unsubscribed = () => {
  return {
    type: 'UNSUBSCRIBED',
  };
};
