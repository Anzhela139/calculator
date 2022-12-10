const removeActiveKeyMixin = {
    methods: {
        removeActiveKey(event) {
            const btn = event.target;
            if (!btn) return;
            btn.classList.remove('active');
        }
    }
}

const setActiveKeyMixin = {
    methods: {
        setActiveKey(el) {
            el.classList.add('active');
        }
    }
}

export {
    removeActiveKeyMixin,
    setActiveKeyMixin
};
