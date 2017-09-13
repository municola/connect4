import io from 'socket.io-client';

// const socket = io('/socket.io');
const socket = io('http://localhost:3000');

socket.on('connected', () => {
  return {
    type: 'CONNECTED',
  };
});

socket.on('subscribed', (howMany, roomId) => {
  return {
    type: 'SUBSCRIBED',
    howMany,
    roomId,
  };
});

socket.on('ready', (sym, msg, myTurn) => {
  return {
    type: 'READY',
    sym,
    msg,
    myTurn,
  };
});


socket.on('newMessage', (id, username, message) => {
  return {
    type: 'NEW_MESSAGE',
    id,
    username,
    message,
  };
});

socket.on('winner', () => {
  const message = 'You lost';
  return {
    type: 'SET_WINNER',
    message,
  };
});

socket.on('turn', (table) => {
  return {
    type: 'ENEMY_TURN',
    table,
  };
});

socket.on('unsubscribed', () => {
  return {
    type: 'UNSUBSCRIBED',
  };
});

socket.on('newGameMessage', (id, username, message) => {
  return {
    type: 'NEW_GAME_MESSAGE',
    id,
    username,
    message,
  };
});

socket.on('update', (howMany) => {
  return {
    type: 'UPDATE_HOW_MANY',
    howMany,
  };
});

socket.on('updateMembers', (members) => {
  return {
    type: 'UPDATE_MEMBERS',
    members,
  };
});

socket.on('newUser', (id, username) => {
  return {
    type: 'NEW_USER',
    id,
    username,
  };
});

socket.on('playerJoined', (id, username) => {
  return {
    type: 'PLAYER_JOINED',
    id,
    username,
  };
});

socket.on('playerLeft', (id, username) => {
  const message = 'You won (Forfeit)';
  return {
    type: 'PLAYER_LEFT',
    id,
    username,
    message,
  };
});

socket.on('userLeft', (id, username) => {
  return {
    type: 'USER_LEFT',
    id,
    username,
  };
});

export const connectMe = (username) => {
  socket.emit('connectMe', username);
};

export const subscribe = (roomId, username) => {
  socket.emit('subscribe', roomId, username);
};

export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username,
  };
};

export const sendMessage = (message, username) => {
  socket.emit('sendMessage', message, username);
};

export const setWinner = (message) => {
  socket.emit('winner');
  return {
    type: 'SET_WINNER',
    message,
  };
};

export const finishTurn = (table) => {
  socket.emit('turn', table);
  return {
    type: 'FINISH_TURN',
    table,
  };
};

export const unsubscribe = (roomId, username) => {
  socket.emit('unsubscribe', roomId, username);
};

export const sendGameMessage = (roomId, message, username) => {
  socket.emit('sendGameMessage', roomId, message, username);
};

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


export const gameStartMessage = () => {
  return {
    type: 'GAME_START_MESSAGE',
  };
};

export const leave = () => {
  return {
    type: 'LEAVE',
  };
};
