import io from 'socket.io-client';

const socket = io();
// const socket = io('http://localhost:3000/');

export function attachStore(store) {
  socket.on('connected', () => {
    store.dispatch({ type: 'CONNECTED' });
  });
  socket.on('userLeft', (id, username) => {
    store.dispatch({ type: 'USER_LEFT', id, username });
  });
  socket.on('playerLeft', (id, username) => {
    const message = 'You won (Forfeit)';
    store.dispatch({ type: 'PLAYER_LEFT', id, username, message });
  });
  socket.on('playerJoined', (id, username) => {
    store.dispatch({ type: 'PLAYER_JOINED', id, username });
  });
  socket.on('newUser', (id, username) => {
    store.dispatch({ type: 'NEW_USER', id, username });
  });
  socket.on('updateMembers', (members) => {
    store.dispatch({ type: 'UPDATE_MEMBERS', members });
  });
  socket.on('update', (howMany) => {
    store.dispatch({ type: 'UPDATE_HOW_MANY', howMany });
  });
  socket.on('newGameMessage', (id, username, message) => {
    store.dispatch({ type: 'NEW_GAME_MESSAGE', id, username, message });
  });
  socket.on('unsubscribed', () => {
    store.dispatch({ type: 'UNSUBSCRIBED' });
  });
  socket.on('turn', (table) => {
    store.dispatch({ type: 'ENEMY_TURN', table });
  });
  socket.on('winner', () => {
    const message = 'You lost';
    store.dispatch({ type: 'SET_WINNER', message });
  });
  socket.on('newMessage', (id, username, message) => {
    store.dispatch({ type: 'NEW_MESSAGE', id, username, message });
  });
  socket.on('ready', (symb, msge, myTurne) => {
    store.dispatch({ type: 'READY', symb, msge, myTurne });
  });
  socket.on('subscribed', (howMany, roomId) => {
    store.dispatch({ type: 'SUBSCRIBED', howMany, roomId });
  });
}

export function connectMe(usernamee) {
  socket.emit('connectMe', usernamee);
}

export function subscribe(roomId, username) {
  socket.emit('subscribe', roomId, username);
}

export function sendMessage(message, username) {
  socket.emit('sendMessage', message, username);
}

export function unsubscribe(roomId, username) {
  socket.emit('unsubscribe', roomId, username);
}

export function sendGameMessage(roomId, message, username) {
  socket.emit('sendGameMessage', roomId, message, username);
}

export function setWinner() {
  socket.emit('winner');
}

export function finishTurn(table) {
  socket.emit('turn', table);
}
