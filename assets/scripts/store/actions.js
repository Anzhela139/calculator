function setCurrentOperand({ commit }, data) {
    commit('change_current_operand', data);
}

export default {
    setCurrentOperand
};