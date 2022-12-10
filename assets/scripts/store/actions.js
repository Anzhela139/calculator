function setCurrentOperand({ commit }, data) {
    commit('set_current_operand', data);
}

function setPreviousOperand({ commit }, data) {
    commit('set_previous_operand', data);
}

function setReadyToReset({ commit }, data) {
    commit('set_ready_to_reset', data);
}

function setOperation({ commit }, data) {
    commit('set_operation', data);
}

export default {
    setCurrentOperand,
    setPreviousOperand,
    setReadyToReset,
    setOperation
};