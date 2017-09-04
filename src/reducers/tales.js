const initialState = {
  myTurn: false,
  mySymbol: '',
  finishTurn: false,
  ready: false,
  undoAvailable: false,

  cells: [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ],
  past: [
    [
      ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ],
  ],
};

export default function tales(state = initialState, action) {
  switch (action.type) {
    case 'CLICK_BUTTON': {
      let temp = state;
      // Set X or O
      if (temp.cells[action.index] === ' ') {
        // index 0 - 34
        if (action.index <= 34 && temp.cells[action.index + 7] !== ' ') {
          // Set X
          temp = {
            ...temp,
            cells: [
              ...temp.cells.slice(0, action.index),
              action.symbol,
              ...temp.cells.slice(action.index + 1),
            ],
          };
        }
        // index 34 - 42
        if (action.index > 34) {
          // Set X
          temp = {
            ...temp,
            cells: [
              ...temp.cells.slice(0, action.index),
              action.symbol,
              ...temp.cells.slice(action.index + 1),
            ],
          };
        }
        // Cick a Symbol
      } else {
        let a = action.index;
        while (a > 6) {
          temp = {
            ...temp,
            cells: [
              ...temp.cells.slice(0, a),
              temp.cells[a - 7],
              ...temp.cells.slice(a + 1),
            ],
          };
          a -= 7;
        }
        temp = {
          ...temp,
          cells: [
            ...temp.cells.slice(0, a),
            ' ',
            ...temp.cells.slice(a + 1),
          ],
        };
      }
      // Validation Check
      let c = 0;
      while (c < temp.past.length) {
        let d = 0;
        for (let i = 0; i < 42; i++) {
          if (temp.cells[i] === temp.past[c][i]) {
            d++;
          }
        }
        if (d === 42) {
          return state;
        }
        c++;
      }

      temp = {
        ...temp,
        past: temp.past.concat([temp.cells]),
        undoAvailable: true,
        myTurn: false,
      };

      return temp;
    }
    case 'UNDO': {
      return {
        ...state,
        cells: [
          ...state.past[state.past.length - 2]],
        count: action.turn,
        past: [
          ...state.past.slice(0, state.past.length - 1),
        ],
        undoAvailable: false,
        ready: false,
        myTurn: true,
      };
    }
    case 'ENEMY_TURN' : {
      return {
        ...state,
        cells: action.table,
        past: state.past.concat([action.table]),
        myTurn: true,
      };
    }
    case 'READY' : {
      return {
        ...state,
        ready: true,
      };
    }
    case 'SYMBOL' : {
      return {
        ...state,
        mySymbol: action.symbol,
      };
    }
    case 'MY_TURN' : {
      return {
        ...state,
        myTurn: true,
        past: state.past.concat([state.cells]),
      };
    }
    case 'FINISH_TURN' : {
      return {
        ...state,
        finishTurn: true,
        myTurn: false,
        undoAvailable: false,
      };
    }
    default: {
      return state;
    }
  }
}

