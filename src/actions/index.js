export const setX = (index) => {
  return {
    type: 'SET_X',
    index,
  };
};

export const setO = (index) => {
  return {
    type: 'SET_O',
    index,
  };
};

export const cickSymbol = (index) => {
  return {
    type: 'CICK_SYMBOL',
    index,
  };
};

export const cickSymbol2 = (index) => {
  return {
    type: 'CICK_SYMBOL2',
    index,
  };
};

export const undoCickedSymbol = (index) => {
  return {
    type: 'UNDO_CICKED_SYMBOL',
    index,
  };
};

export const getState = () => {
  return {
    type: 'GET_STATE',
  };
};
