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
};

const tale = (state = initialState, action) => {
  switch (action.type) {
    case 'CLICK_BUTTON': {
      const index = action.index;
      let tempStore = { ...state };

      if (tempStore.cells[index] === 'X' || tempStore.cells[index] === 'O') {
        // Kick the Symbol
        let id = action.index;
        while (tempStore.cells[id] === 'X' || tempStore.cells[id] === 'O') {
          // Rows 1-6
          if (id > 6) {
            tempStore = {
              ...tempStore,
              cells: [
                ...tempStore.cells.slice(0, id),
                // tempStore.cells[id] = 'l',
                tempStore.cells[id] = tempStore.cells[id - 7],
                ...tempStore.cells.slice(id + 1),
              ],
            };
          } else {
            // Row 7
            tempStore = {
              ...tempStore,
              cells: [
                ...tempStore.cells.slice(0, id),
                tempStore.cells[id] = ' ',
                ...tempStore.cells.slice(id + 1),
              ],
            };
          }
          id -= 7;
        }
      } else if (tempStore.cells[index] === ' ') {
        // Place a Symbol
        if (index > 34) {
          // Row 1
          if (tempStore.count === 0) {
            // Place X
            tempStore = {
              ...tempStore,
              cells: [
                ...tempStore.cells.slice(0, action.index),
                tempStore.cells[action.index] = 'X',
                ...tempStore.cells.slice(action.index + 1),
              ],
              count: 1,
            };
          } else {
            // Place O
            tempStore = {
              ...tempStore,
              cells: [
                ...tempStore.cells.slice(0, action.index),
                tempStore.cells[action.index] = 'O',
                ...tempStore.cells.slice(action.index + 1),
              ],
              count: 0,
            };
          }
        } else if (tempStore.cells[index + 7] !== ' ') {
          // Row 2-7
          if (tempStore.count === 0) {
            // Place X
            tempStore = {
              ...tempStore,
              cells: [
                ...tempStore.cells.slice(0, action.index),
                tempStore.cells[action.index] = 'X',
                ...tempStore.cells.slice(action.index + 1),
              ],
              count: 1,
            };
          } else {
            // Place O
            tempStore = {
              ...tempStore,
              cells: [
                ...tempStore.cells.slice(0, action.index),
                tempStore.cells[action.index] = 'O',
                ...tempStore.cells.slice(action.index + 1),
              ],
              count: 0,
            };
          }
        }
      }
      console.log(tempStore.cells);
      return tempStore;
    }
    default: {
      return state;
    }
  }
};

const undoableTale = undoable(tale, {});

export default undoableTale;

// hash-map
// join
