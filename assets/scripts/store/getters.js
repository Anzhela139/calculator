const getCurrentOperand = state => {
  return state.currentOperand;
};

const getPreviousOperand = state => {
  return state.previousOperand;
};

const getReadyToReset = state => {
  return state.readyToReset;
};

const getOperation = state => {
  return state.operation;
};

export default {
    getCurrentOperand,
    getPreviousOperand,
    getReadyToReset,
    getOperation
};