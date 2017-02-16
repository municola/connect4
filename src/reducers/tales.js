import undoable from 'redux-undo';

const { List } = require('immutable');

const initialState = List.of(
  [false],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ],
  [0],
);

const tale = (state = initialState, action) => {
  switch (action.type) {
    case 'CLICK_BUTTON': {
      const index = action.index;
      let tempStore = state;

      if (tempStore.get(1)[index] === 'X' || tempStore.get(1)[index] === 'O') {
        // Kick the Symbol
        let id = action.index;
        while (tempStore.get(1)[id] === 'X' || tempStore.get(1)[id] === 'O') {
          // Rows 1-6
          if (id > 6) {
            tempStore.set(tempStore.get(1)[id], tempStore.get(1)[id - 7]);
          } else {
            // Row 7
            tempStore.set(tempStore.get(1)[id], ' ');
          }
          id -= 7;
        }
      } else if (tempStore.get(1)[index] === ' ') {
        // Place a Symbol
        if (index > 34) {
          // Row 1
          if (tempStore.get(2)[0] === 0) {
            // Place X
            tempStore.set(tempStore.get(1)[action.index], 'X');
            tempStore.set(tempStore.get(2)[0], 1);
          } else {
            // Place O
            tempStore.set(tempStore.get(1)[action.index], 'O');
            tempStore.set(tempStore.get(2)[0], 0);
          }
        } else if (tempStore.get(1)[index + 7] !== ' ') {
          // Row 2-7
          if (tempStore.get(2)[0] === 0) {
            // Place X
            tempStore.set(tempStore.get(1)[action.index], 'X');
            tempStore.set(tempStore.get(2)[0], 1);
          } else {
            // Place O
            tempStore.set(tempStore.get(1)[action.index], 'O');
            tempStore.set(tempStore.get(2)[0], 0);
          }
        }
      }
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
