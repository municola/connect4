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

export const joinTrue = () => {
  return {
    type: 'JOIN_TRUE',
  };
};

export const initSocket = (socket) => {
  return {
    type: 'INIT_SOCKET',
    socket,
  };
};

export const finishTurn = (socket, gameId, table) => {
  socket.emit('turn', gameId, table);
  return {
    type: 'FINISH_TURN',
    table,
  };
};

export const ready = (socket) => {
  return {
    type: 'READY',
  };
};

export const myTurn = () => {
  return {
    type: 'MY_TURN',
  };
};

export const enemyTurn = (table) => {
  return {
    type: 'ENEMY_TURN',
    table,
  };
};

export const symbol = (symbol) => {
  return {
    type: 'SYMBOL',
    symbol,
  };
};

export const room = (i) => {
  return {
    type: 'ROOM',
    i,
  };
};

export const peopleUpdate = (id, people) => {
  return {
    type: 'PEOPLE_UPDATE',
    id,
    people,
  };
};
