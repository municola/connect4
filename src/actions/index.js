export const clickButton = (index) => {
  return {
    type: 'CLICK_BUTTON',
    index,
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
