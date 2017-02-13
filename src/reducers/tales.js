import undoable, { excludeAction, distinctState } from 'redux-undo';

const initialState = {
  winner: false,
  cells: [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ],
  count: 0,
  count2: 0,
};

let count2 = 0;

const tale = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_X': {
      return {
        ...state,
        cells: [
          ...state.cells.slice(0, action.index),
          state.cells[action.index] = 'X',
          ...state.cells.slice(action.index + 1),
        ],
        count: 1,
      };
    }
    case 'SET_O': {
      return {
        ...state,
        cells: [
          ...state.cells.slice(0, action.index),
          state.cells[action.index] = 'O',
          ...state.cells.slice(action.index + 1),
        ],
        count: 0,
      };
    }
    case 'CICK_SYMBOL' : {
      return {
        ...state,
        cells: [
          ...state.cells.slice(0, action.index),
          state.cells[action.index] = state.cells[action.index - 7],
          ...state.cells.slice(action.index + 1),
        ],
      };
    }
    case 'CICK_SYMBOL2' : {
      return {
        ...state,
        cells: [
          ...state.cells.slice(0, action.index),
          state.cells[action.index] = ' ',
          ...state.cells.slice(action.index + 1),
        ],
      };
    }
    case 'GET_STATE' : {
      return state;
    }
    case 'UNDO_CICKED_SYMBOL' : {
      // something else
      return state;
    }
    default: {
      return state;
    }
  }
};

const undoableTale = undoable(tale, {
  // filter: excludeAction(['CICK_SYMBOL', 'CICK_SYMBOL2']),
  initTypes: ['@@redux/INIT', '@@INIT'],
});

export default undoableTale;

