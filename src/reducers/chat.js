const initialState = {
  members: [],
  chatlog: [],
  gamechatlog: [[2, 'The game has started']],
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_MEMBERS' : {
      return { ...state, members: action.members };
    }
    case 'NEW_MESSAGE' : {
      return {
        ...state,
        chatlog: state.chatlog.concat([[action.id, action.username, action.message]]),
      };
    }
    case 'NEW_USER' : {
      return {
        ...state,
        chatlog: state.chatlog.concat([[action.id, action.username, 'connected']]),
      };
    }
    case 'NEW_GAME_MESSAGE' : {
      return {
        ...state,
        gamechatlog: state.gamechatlog.concat([[action.id, action.username, action.message]]),
      };
    }
    default: {
      return state;
    }
  }
}

