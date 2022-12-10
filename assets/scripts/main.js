import createStore from './store/index.js';
import CalcKey from './components/button.js';

const body = new Vue({
  el: '#calculator',
  store: createStore(),
  components: {
    CalcKey
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyboard.bind(this));
  },
  computed: {
    ...Vuex.mapGetters([
      'getCurrentOperand',
      'getPreviousOperand',
      'getReadyToReset',
      'getOperation'
    ]),
    ...Vuex.mapState({
      currentOperand: state => state.currentOperand,
      previousOperand: state => state.previousOperand,
      readyToReset: state => state.readyToReset,
      operation: state => state.operation
    })
  },
  methods: {
    ...Vuex.mapActions([
      'setCurrentOperand',
      'setPreviousOperand',
      'setReadyToReset',
      'setOperation'
    ]),
    clear() {
      this.$store.dispatch('setCurrentOperand', 0);
      this.$store.dispatch('setPreviousOperand', 0);
      this.$store.dispatch('setOperation', undefined);
    },
    delete() {
      if (this.getCurrentOperand.length === 1) return this.$store.dispatch('setCurrentOperand', 0);

      this.$store.commit('setCurrentOperand', this.getCurrentOperand.toString().slice(0, -1));
      console.log(this.getCurrentOperand.toString().slice(0, -1))
    },
    appendNumber(number) {
      console.log(this.getCurrentOperand.toString() + number.toString(),number === '.' && this.getCurrentOperand.includes('.'))
      if (number === '.' && this.getCurrentOperand.includes('.')) return;
      this.$store.dispatch('setCurrentOperand', this.getCurrentOperand.toString() + number.toString())
    },
    chooseOperation(operation) {
      if (this.getCurrentOperand === '0') return;
      if (this.getPreviousOperand !== '') {
        this.compute();
      }

      this.$store.dispatch('setOperation', operation);
      this.$store.dispatch('setPreviousOperand', this.getCurrentOperand);
      console.log(this.getCurrentOperand , this.getPreviousOperand)

      this.$store.dispatch('setCurrentOperand', 0);
    },
    compute() {
      let computation;
      const prev = parseFloat(this.getPreviousOperand.replace(/[^\d\.]/gi, ''));
      const current = parseFloat(this.getCurrentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break
        case '-':
          computation = prev - current;
          break
        case '*':
          computation = prev * current;
          break
        case '÷':
          computation = prev / current;
          break
        case 'x2':
          computation = Math.pow(current, prev);
          break
        default:
          return;
      }
      console.log(computation)

      this.setOperationResult(computation);
    },
    computeUnoOperation(operation) {
      this.$store.dispatch('setOperation', operation);

      let curr = parseFloat(this.getCurrentOperand.replace(/[^\d\.]/gi, ''));
      if (this.getCurrentOperand === '') return;
      let result;
      switch (operation) {
        case '√':
          if (curr < 0) {
            return result = 'it\'s impossible. Try something else.';
          }
          result = Math.sqrt(curr);
          break;
        case '+/-':
          result = (curr < 0) ? Math.abs(curr) : -Math.abs(curr);
          break;
        case '.':
          result = `${curr}.`;
          break;
        default:
          return;
      }

      this.setOperationResult(result);
    },
    setOperationResult(result) {
      this.$store.dispatch('setReadyToReset', true);
      this.$store.dispatch('setCurrentOperand', result);
      this.$store.dispatch('setOperation', undefined);
      this.$store.dispatch('setPreviousOperand', '');
    },
    getDisplayNumber(num) {
      const rounded = Math.round(parseFloat(String(num).replace(/[^\d\.]/gi, '')) * 100) / 100;

      return `${String(rounded).replace(/^0/, '').replace(/,/gi, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}${/\.$/.test(num) ? '.' : ''}`;
    },
    updateDisplay() {
      this.$store.dispatch('setCurrentOperand',
        this.getDisplayNumber(this.getCurrentOperand) || '0');

      this.$store.dispatch('setPreviousOperand', 
            this.getOperation != null 
            ? `${this.getDisplayNumber(this.getPreviousOperand)} ${this.operation}` 
            : '');
    },
    onNumberUpdate(event) {
      const btn = event.target;
      this.setActiveKey(btn);
      if (this.getPreviousOperand === "" &&
        this.getCurrentOperand !== "" &&
        this.getReadyToReset) {

        this.$store.dispatch('setCurrentOperand', 0);
        this.$store.dispatch('setReadyToReset', false);
      }

      this.appendNumber(btn.innerText)
      this.updateDisplay();
    },
    onOperationBtn(event) {
      const btn = event.target;
      this.setActiveKey(btn);
      this.chooseOperation(btn.innerText);
      this.updateDisplay();
    },
    onEquals(event) {
      const btn = event.target;
      this.setActiveKey(btn);
      this.compute();
      this.updateDisplay();
    },
    onAllClear(event) {
      const btn = event.target;
      this.setActiveKey(btn);
      this.clear();
      this.updateDisplay();
    },
    onDelete(event) {
      const btn = event.target;
      this.setActiveKey(btn);
      this.delete();
      this.updateDisplay();
    },
    onUnoOperations(event) {
      const btn = event.target;
      this.setActiveKey(btn);
      this.computeUnoOperation(btn.innerText);
      this.updateDisplay();
    },
    setActiveKey(el) {
      el.classList.add('active');
    },
    onKeyboard(event) {
      if (event.repeat) return;
      for (let i = 0; i < 10; i++) {
        if (event.code === `Digit${i + 1}`) {
          this.appendNumber(i + 1)
          this.updateDisplay();
        }
        console.log(event.code, event.repeat)
        if (event.code === "Backspace") {
          this.delete();
          // this.updateDisplay();
        }
      }
    }
  },
  template: `
      <main>
        <div class="wrapper">
          <div class="output">
            <div class="prev-operand" data-js-prev-operand="">{{ previousOperand }}</div>
            <div class="curr-operand" data-js-curr-operand="">{{ currentOperand }}</div>
          </div>
          <calc-key v-bind:handleClick="onDelete" v-bind:text=" 'DEL' " />
          <button @click="onAllClear" class="span-two all-clear" @transitionend="removeActiveKey">AC</button>
          <button v-for="index in 10" :key="index" :data-js-number-operand="index -1"
            @click="onNumberUpdate" @transitionend="removeActiveKey">{{ index -1 }}</button>

          <button @click="onOperationBtn" @transitionend="removeActiveKey" data-js-operation="plus">+</button>
          <button @click="onOperationBtn" @transitionend="removeActiveKey" data-js-operation="minus">-</button>
          <button @click="onOperationBtn" @transitionend="removeActiveKey" data-js-operation="delete">÷</button>
          <button @click="onOperationBtn" @transitionend="removeActiveKey" data-js-operation="multiply">*</button>
          <button @click="onNumberUpdate" @transitionend="removeActiveKey">.</button>
          <button @click="onUnoOperations" @transitionend="removeActiveKey">+/-</button>
          <button @click="onOperationBtn" @transitionend="removeActiveKey" data-js-operation="plus">x
            <sup>x</sup>
          </button>
          <button @click="onUnoOperations" @transitionend="removeActiveKey">√</button>
          <button class="span-two" @click="onEquals" @transitionend="removeActiveKey">=</button>
        </div>
      </main>`
})
