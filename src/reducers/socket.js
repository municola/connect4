const initialState = {
  socket: undefined,
};

export default function socket(state = initialState, action) {
  switch (action.type) {
    case 'INIT_SOCKET' : {
      return { ...state, socket: action.socket };
    }
    default: {
      return state;
    }
  }
}

