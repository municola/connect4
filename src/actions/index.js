export const clickButton = (index, turn) => {
  if (turn === true) {
    return {
      type: 'CLICK_BUTTON',
      index,
    };
  }
  return {
    type: 'NOT_CLICK_BUTTON',
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

export const ready = (socket, id) => {
  socket.emit('turn', id);
  return {
    type: 'READY',
  };
};

