function setCurrentOperandAction({ commit }, data) {
    commit('setCurrentOperand', data);
}

function setPreviousOperandAction({ commit }, data) {
    commit('setPreviousOperand', data);
}

function setReadyToResetAction({ commit }, data) {
    commit('setReadyToReset', data);
}

function setOperationAction({ commit }, data) {
    commit('setOperation', data);
}

export default {
    setCurrentOperandAction,
    setPreviousOperandAction,
    setReadyToResetAction,
    setOperationAction
};