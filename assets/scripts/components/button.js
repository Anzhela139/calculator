import removeActiveKeyMixin from './../mixins/utils.js';

const CalcKey = {
    mixins: [removeActiveKeyMixin],
    props: {
        text: String,
        handleClick: Function
    },
    template: `
        <button @click="handleClick" class="span-two" @transitionend="removeActiveKey">{{ text }}</button>
    `
}

export default CalcKey;