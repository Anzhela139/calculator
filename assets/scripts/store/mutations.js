/**
 *
 * @param {state} state
 * @param {integer} data
 * Устанавливает номер недели
 */
const change_current_operand = (state, data) => {
    state.currentOperand = data;
};



export default {
    change_current_operand
};