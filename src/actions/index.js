import io from 'socket.io-client';

// const socket = io('/socket.io');
const socket = io('http://localhost:3000');

export function connectMe(usernamee) {
  return (dispatch) => {
    socket.emit('connectMe', usernamee);
    socket.on('connected', () => {
      dispatch({ type: 'CONNECTED' });
    });
    socket.on('userLeft', (id, username) => {
      dispatch({ type: 'USER_LEFT', id, username });
    });
    socket.on('playerLeft', (id, username) => {
      const message = 'You won (Forfeit)';
      dispatch({ type: 'PLAYER_LEFT', id, username, message });
    });
    socket.on('playerJoined', (id, username) => {
      dispatch({ type: 'PLAYER_JOINED', id, username });
    });
    socket.on('newUser', (id, username) => {
      dispatch({ type: 'NEW_USER', id, username });
    });
    socket.on('updateMembers', (members) => {
      dispatch({ type: 'UPDATE_MEMBERS', members });
    });
    socket.on('update', (howMany) => {
      dispatch({ type: 'UPDATE_HOW_MANY', howMany });
    });
    socket.on('newGameMessage', (id, username, message) => {
      dispatch({ type: 'NEW_GAME_MESSAGE', id, username, message });
    });
    socket.on('unsubscribed', () => {
      dispatch({ type: 'UNSUBSCRIBED' });
    });
    socket.on('turn', (table) => {
      dispatch({ type: 'ENEMY_TURN', table });
    });
    socket.on('winner', () => {
      const message = 'You lost';
      dispatch({ type: 'SET_WINNER', message });
    });
    socket.on('newMessage', (id, username, message) => {
      dispatch({ type: 'NEW_MESSAGE', id, username, message });
    });
    socket.on('ready', (symb, msge, myTurne) => {
      dispatch({ type: 'READY', symb, msge, myTurne });
    });
    socket.on('subscribed', (howMany, roomId) => {
      dispatch({ type: 'SUBSCRIBED', howMany, roomId });
    });
  };
}

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
