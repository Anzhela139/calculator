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
    },
    appendNumber(number) {
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

      this.$store.dispatch('setCurrentOperand', 0);
    },
    compute() {
      let computation;
      const prev = parseFloat(this.getPreviousOperand.replace(/[^\d\.]/gi, ''));
      const current = parseFloat(this.getCurrentOperand.replace(/[^\d\.]/gi, ''));

      if (isNaN(prev) || isNaN(current)) return;
      switch (this.getOperation) {
        case 'plus':
          computation = prev + current;
          break
        case 'minus':
          computation = prev - current;
          break
        case 'multiply':
          computation = prev * current;
          break
        case 'delete':
          computation = prev / current;
          break
        case 'exponentiation':
          computation = Math.pow(current, prev);
          break
        default:
          return;
      }

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
    onNumberUpdate(btnInfo) {
      if (this.getPreviousOperand === "" &&
        this.getCurrentOperand !== "" &&
        this.getReadyToReset) {

        this.$store.dispatch('setCurrentOperand', 0);
        this.$store.dispatch('setReadyToReset', false);
      }

      this.appendNumber(btnInfo);
      this.updateDisplay();
    },
    onOperationBtn(btnInfo) {
      this.chooseOperation(btnInfo);
      this.updateDisplay();
    },
    onEquals() {
      this.compute();
      this.updateDisplay();
    },
    onAllClear() {
      this.clear();
      this.updateDisplay();
    },
    onDelete() {
      this.delete();
      this.updateDisplay();
    },
    onUnoOperations(btnInfo) {
      this.computeUnoOperation(btnInfo);
      this.updateDisplay();
    },
    onKeyboard(event) {
      if (event.repeat) return;

      if (event.code.match(/^(Digit)/) || event.code.match(/^(Numpad)/)) {
        this.appendNumber(parseInt(event.code.replace(/\D/gi, '')))
        this.updateDisplay();
      }

      if (event.code === 'Equal' && event.shiftKey) {
        this.onEquals();
      }

      if (event.code === 'Equal' && !event.shiftKey) {
        this.onOperationBtn('plus');
      }

      if (event.code === 'Minus' && !event.shiftKey) {
        this.onOperationBtn('minus');
      }

      if (event.code === "Backspace") {
        this.onDelete();
      }
    }
  },
  template: `
      <main>
        <div class="wrapper">
          <div class="output">
            <div class="prev-operand" data-js-prev-operand="">{{ getPreviousOperand }}</div>
            <div class="curr-operand" data-js-curr-operand="">{{ currentOperand }}</div>
          </div>
          <calc-key :handleClick="onDelete" :isTwoKey="true">DEL</calc-key>
          <calc-key :handleClick="onAllClear" :isTwoKey="true">AC</calc-key>
          <calc-key v-for="index in 10" :key="index" 
            :handleClick="onNumberUpdate" :dataAttrs="index -1">{{ index -1 }}</calc-key>
          <calc-key :handleClick="onOperationBtn" :dataAttrs=" 'plus' ">+</calc-key>
          <calc-key :handleClick="onOperationBtn" :dataAttrs=" 'minus' ">-</calc-key>
          <calc-key :handleClick="onOperationBtn" :dataAttrs=" 'delete' ">÷</calc-key>
          <calc-key :handleClick="onOperationBtn" :dataAttrs=" 'multiply' ">*</calc-key>
          <calc-key :handleClick="onNumberUpdate" :dataAttrs=" 'float' ">.</calc-key>
          <calc-key :handleClick="onUnoOperations" :dataAttrs=" 'negative' ">+/-</calc-key>
          <calc-key :handleClick="onOperationBtn" :dataAttrs=" 'exponentiation' ">x<sup>x</sup></calc-key>
          <calc-key :handleClick="onUnoOperations" :dataAttrs=" 'square' ">√</calc-key>
          <calc-key :handleClick="onEquals" :isTwoKey="true" :dataAttrs=" 'equals' ">=</calc-key>
        </div>
      </main>`
})
