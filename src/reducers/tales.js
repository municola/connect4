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
  count: 1,
};

function setSymbol(tempStore, action) {
  console.log(tempStore.count);
  if (tempStore.count === 0) {
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

function kickSymbol(tempStore, action) {
  let id = action.index;
  while (tempStore.cells[id] === 'X' || tempStore.cells[id] === 'O') {
    if (id > 6) {
      tempStore = {
        ...tempStore,
        cells: [
          ...tempStore.cells.slice(0, id),
          tempStore.cells[id] = tempStore.cells[id - 7],
          ...tempStore.cells.slice(id + 1),
        ],
      };
    } else {
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
}

const tale = (state = initialState, action) => {
  switch (action.type) {
    case 'CLICK_BUTTON': {
      const index = action.index;
      const tempStore = { ...state };

      console.log(tempStore);

      if (tempStore.cells[index] === 'X' || tempStore.cells[index] === 'O') {
        kickSymbol(tempStore, action);
      } else if (tempStore.cells[index] === ' ') {
        if (index > 34) {
          setSymbol(tempStore, action);
        } else if (tempStore.cells[index + 7] !== ' ') {
          setSymbol(tempStore, action);
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
