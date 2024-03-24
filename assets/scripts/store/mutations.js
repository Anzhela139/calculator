const setCurrentOperand = (state, data) => {
    state.currentOperand = data;
};

 const setPreviousOperand = (state, data) => {
    state.previousOperand = data;
};

const setReadyToReset = (state, data) => {
    state.readyToReset = data;
};

const setOperation = (state, data) => {
    state.operation = data;
};

export default {
    setCurrentOperand,
    setPreviousOperand,
    setReadyToReset,
    setOperation
};