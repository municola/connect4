const initialState = {
  cells: [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ],
  count: 0,
  past: [],
};

export default function tales(state = initialState, action) {
  switch (action.type) {
    case 'CLICK_BUTTON': {
      let temp = state;
      // Set X or O
      if (temp.cells[action.index] === ' ') {
        // index 0 - 34
        if (action.index <= 34 && temp.cells[action.index + 7] !== ' ') {
          if (temp.count === 0) {
            // Set X
            temp = {
              ...temp,
              cells: [
                ...temp.cells.slice(0, action.index),
                'X',
                ...temp.cells.slice(action.index + 1),
              ],
              count: 1,
            };
          } else {
            // Set O
            temp = {
              ...temp,
              cells: [
                ...temp.cells.slice(0, action.index),
                'O',
                ...temp.cells.slice(action.index + 1),
              ],
              count: 0,
            };
          }
        }
        // index 34 - 42
        if (action.index > 34) {
          if (temp.count === 0) {
            // Set X
            temp = {
              ...temp,
              cells: [
                ...temp.cells.slice(0, action.index),
                'X',
                ...temp.cells.slice(action.index + 1),
              ],
              count: 1,
            };
          } else {
            // Set O
            temp = {
              ...temp,
              cells: [
                ...temp.cells.slice(0, action.index),
                'O',
                ...temp.cells.slice(action.index + 1),
              ],
              count: 0,
            };
          }
        }
        // Not valid, Error Message
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
      };

      return temp;
    }
    default: {
      return state;
    }
  }
}


/*
[
  ...temp.cells.slice(0, a),
  temp.cells[a] = temp.cells[a - 7],
  ...temp.cells.slice(a + 1),            ],

sollte vermutlich

[...temp.cells.slice(0, a),
temp.cells[a - 7],
...temp.cells.slice(a + 1),            ],

sein
*/



/*
import undoable from 'redux-undo';

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
hash-map
*/
