import myBody from './body.js'

const els = myBody.init()

const numberButtons = els.numKeys;
const operationButtons = els.operKeys;
const equalsButton = els.equalsButton;
const deleteButton = els.deleteButton;
const allClearButton = els.allClearButton;
const previousOperandTextElement = els.prevOperand;
const currentOperandTextElement = els.currOperand;
const unoOperationButtons = els.unoKeys;

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.readyToReset = false;
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      if (this.currentOperand.length === 1) return this.currentOperand = '0'
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '0') return;
      if (this.previousOperand !== '' && this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
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
        /* case '.':
          computation = `${prev}.${current}`;
          break; */
        default:
          return;
      }
      this.readyToReset = true;
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }

    computeUnoOperation(operation) {
      this.operation = operation;

      let curr = parseFloat(this.currentOperandTextElement.innerText);
      if(this.currentOperand === '') return;
      let result;
      switch (operation) {
          case '√':
              if (curr < 0) {
                return result = 'it\'s impossible. Try something else.';
              } 
              result = Math.sqrt(curr);
              break;
          case '+/-':
              result = (curr < 0) ? Math.abs(curr): -Math.abs(curr);
              break;
          default: 
              return;
      }
      this.readyToReset = true;
      this.currentOperand = result;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    getDisplayNumber(num) {
      return String(num).replace(/^0/, '').replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
    }

    truncated(num) {
      return Math.trunc(num * 100) / 100;
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        (this.getDisplayNumber(this.currentOperand) !== '' && this.getDisplayNumber(this.currentOperand) !== '-') 
        ? this.getDisplayNumber(this.currentOperand) 
        : '0'
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }

  const activeKey = (el) => {
    el.classList.toggle('active');
  }
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener("click", () => {
  
        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
        calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        activeKey(button);
        calculator.updateDisplay();
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  })

  unoOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.computeUnoOperation(button.innerText);
        calculator.updateDisplay();
    })
  })

  const keyWork = (e) => {
    for (let i = 0; i < 10; i++) {
      if (e.code === `Digit${i+1}`) {
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

window.onunload = function() {
  document.removeEventListener('keydown', keyWork)
}