const initialState = {
  username: '',
  join: false,
  socket: '',
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
    default: {
      return state;
    }
  }
}

