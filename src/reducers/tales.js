const initialState = {
  myTurn: '',
  ready: false,
  cells: [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ],
  count: 0,
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
        // Cick a Symbol
      } else {
        if (temp.count === 0) {
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
            count: 1,
          };
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
            count: 0,
          };
        }
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
        ready: true,
        myTurn: action.index,
      };

      return temp;
    }
    case 'NOT_CLICK_BUTTON' : {
      return state;
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
        myTurn: '',
      };
    }
    case 'READY' : {
      return {
        ...state,
        myTurn: '',
        ready: false,
      };
    }
    default: {
      return state;
    }
  }
}

