export const clickButton = (index) => {
  return {
    type: 'CLICK_BUTTON',
    index,
  };
};

export const undo = (turn) => {
  if (turn === 1) {
    return {
      type: 'UNDO',
      turn: 0,
    };
  }
  return {
    type: 'UNDO',
    turn: 1,
  };
};
