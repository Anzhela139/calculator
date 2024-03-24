import { removeActiveKeyMixin, setActiveKeyMixin } from './../mixins/utils.js';

const CalcKey = {
    props: {
        handleClick: {
            type: Function,
            default: () => {}
        },
        isTwoKey: {
            type: Boolean,
            default: false
        },
        dataAttrs: {
            type: [String, Number],
            default: ''
        },
    },
    mixins: [removeActiveKeyMixin, setActiveKeyMixin],
    methods: {
        onClick(event) {      
            const btn = event.target;
            this.setActiveKey(btn);
            this.handleClick(btn.dataset['js']);
        }
    },
    template: `
        <button @click="onClick" :class="{'span-two': isTwoKey}" :data-js="dataAttrs" @transitionend="removeActiveKey">
            <slot></slot>
        </button>
    `
}

export default CalcKey;