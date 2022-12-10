const removeActiveKeyMixin = (event) => {
    const btn = event.target;
    if (!btn) return;
    btn.classList.remove('active');
}

export default removeActiveKeyMixin;
