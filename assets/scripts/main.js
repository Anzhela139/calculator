import createStore from './store/index.js';

const body = new Vue({
  el: '#calculator',
  store: createStore(),
  data: {
    previousOperand: '',
    readyToReset: false,
    previousOperand: '',
    operation: undefined,
  },
  computed: {
    ...Vuex.mapGetters([
      'getCurrentOperand'
    ]),
    ...Vuex.mapState({
      currentOperand: state => state.currentOperand,
    })
  },
  methods: {
    ...Vuex.mapActions([
      'setCurrentOperand',
    ]),
    clear() {
      this.$store.commit('setCurrentOperand', 0);
      this.previousOperand = '';
      this.operation = undefined;
    },
    delete() {
      if (this.$store.state.currentOperand.length === 1) return this.$store.state.currentOperand = '0'
      this.$store.commit('setCurrentOperand', this.$store.state.currentOperand.toString().slice(0, -1));
    },
    appendNumber(number) {
      if (number === '.' && this.$store.state.currentOperand.includes('.')) return;
      this.$store.commit('setCurrentOperand', this.$store.state.currentOperand.toString() + number.toString());
    },
    chooseOperation(operation) {
      if (this.$store.state.currentOperand === '0') return;
      if (this.previousOperand !== '' && this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.$store.state.currentOperand;
      this.$store.commit('setCurrentOperand', 0);
    },
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand.replace(/[^\d\.]/gi, ''));
      const current = parseFloat(this.$store.state.currentOperand);
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
        // case '.':
        //   computation = `${prev}.${current}`;
        //   break; 
        default:
          return;
      }
      console.log(computation)
      this.readyToReset = true;
      this.$store.commit('setCurrentOperand', computation);
      this.operation = undefined;
      this.previousOperand = '';
    },
    computeUnoOperation(operation) {
      this.operation = operation;

      let curr = parseFloat(this.currentOperand.replace(/[^\d\.]/gi, ''));
      if (this.currentOperand === '') return;
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
      this.readyToReset = true;
      this.$store.commit('setCurrentOperand', result);
      this.operation = undefined;
      this.previousOperand = '';
    },
    getDisplayNumber(num) {
      return String(num).replace(/^0/, '').replace(/,/gi, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },

    truncated(num) {
      return Math.trunc(num * 100) / 100;
    },
    updateDisplay() {
      this.$store.commit('setCurrentOperand',
        (this.getDisplayNumber(this.$store.state.currentOperand) !== '')
          ? this.getDisplayNumber(this.$store.state.currentOperand)
          : '0')

      if (this.operation != null) {
        this.previousOperand =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperand = ''
      }
    },
    onNumberUpdate(event) {
      const btn = event.target;
      if (this.previousOperand === "" &&
        this.$store.state.currentOperand !== "" &&
        this.readyToReset) {
          this.$store.commit('setCurrentOperand', 0);
        this.readyToReset = false;
      }

      this.appendNumber(btn.innerText)
      activeKey(btn);
      this.updateDisplay();
    },
    onOperationBtn(event) {
      const btn = event.target;
      this.chooseOperation(btn.innerText);
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
    onUnoOperations(event) {
      const btn = event.target;
      this.computeUnoOperation(btn.innerText);
      this.updateDisplay();
    }
  },
  template: `
      <main>
        <div class="wrapper">
          <div class="output">
            <div class="prev-operand">{{ previousOperand }}</div>
            <div class="curr-operand">{{ currentOperand }}</div>
          </div>
          <button @click="onDelete" class="span-two delete">DEL</button>
          <button @click="onAllClear" class="span-two all-clear">AC</button>
          <button @click="onNumberUpdate">0</button>
          <button @click="onNumberUpdate">1</button>
          <button @click="onNumberUpdate">2</button>
          <button @click="onNumberUpdate">3</button>
          <button @click="onNumberUpdate">4</button>
          <button @click="onNumberUpdate">5</button>
          <button @click="onNumberUpdate">6</button>
          <button @click="onNumberUpdate">7</button>
          <button @click="onNumberUpdate">8</button>
          <button @click="onNumberUpdate">9</button>
          <button @click="onOperationBtn">+</button>
          <button @click="onOperationBtn">-</button>
          <button @click="onOperationBtn">÷</button>
          <button @click="onOperationBtn">*</button>
          <button @click="onUnoOperations">.</button>
          <button @click="onUnoOperations">+/-</button>
          <button>x
            <sup>x</sup>
          </button>
          <button @click="onUnoOperations">√</button>
          <button class="span-two" @click="onEquals">=</button>
        </div>
      </main>`
})

const activeKey = (el) => {
  el.classList.toggle('active');
}

const keyWork = (e) => {
  for (let i = 0; i < 10; i++) {
    if (e.code === `Digit${i + 1}`) {
      calculator.appendNumber(i + 1)
      calculator.updateDisplay();
    }
    if (e.code === "Backspace") {
      calculator.delete();
      calculator.updateDisplay();
    }
  }
}

document.addEventListener('keydown', keyWork)
