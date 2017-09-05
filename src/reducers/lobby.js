const initialState = {
  username: '',
  join: false,
  socket: '',
  room: '',
  people: [0, 0, 0],
  subscribed: false,
};

export default function lobby(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERNAME' : {
      return { ...state, username: action.username };
    }
    case 'JOIN_TRUE' : {
      return { ...state, join: true };
    }
    case 'INIT_SOCKET' : {
      return { ...state, socket: action.socket };
    }
    case 'ROOM' : {
      return { ...state, room: action.i, subscribed: true };
    }
    case 'PEOPLE_UPDATE' : {
      return {
        ...state,
        people: action.people,
      };
    }
    default: {
      return state;
    }
  }
}

