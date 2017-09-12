const initialState = {
  members: [],
  chatlog: [],
  gamechatlog: [[2, 'You connected']],
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_MEMBERS' : {
      return { ...state, members: action.members };
    }
    case 'GAME_START_MESSAGE' : {
      return { ...state, gamechatlog: state.gamechatlog.concat([[2, 'Game started']]) };
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
    case 'USER_LEFT' : {
      return {
        ...state,
        chatlog: state.chatlog.concat([[action.id, action.username, 'disconnected']]),
      };
    }
    case 'NEW_GAME_MESSAGE' : {
      return {
        ...state,
        gamechatlog: state.gamechatlog.concat([[action.id, action.username, action.message]]),
      };
    }
    case 'PLAYER_LEFT' : {
      return {
        ...state,
        gamechatlog: state.gamechatlog.concat([[action.id, action.username, 'left']]),
      };
    }
    case 'PLAYER_JOINED' : {
      return {
        ...state,
        gamechatlog: state.gamechatlog.concat([[action.id, action.username, 'joined']]),
      };
    }
    case 'LEAVE' : {
      return { ...state, gamechatlog: [[2, 'You connected']] };
    }
    default: {
      return state;
    }
  }
}
