const set_current_operand = (state, data) => {
    state.currentOperand = data;
};

 const set_previous_operand = (state, data) => {
    state.previousOperand = data;
};

const set_ready_to_reset = (state, data) => {
    state.readyToReset = data;
};

const set_operation = (state, data) => {
    state.operation = data;
};

export default {
    set_current_operand,
    set_previous_operand,
    set_ready_to_reset,
    set_operation
};