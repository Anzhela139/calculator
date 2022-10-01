const $numberButtons = document.querySelectorAll('[data-number]');
const $operationButtons = document.querySelectorAll('[data-operation]');
const $equalsButton = document.querySelector('[data-equals]');
const $deleteButton = document.querySelector('[data-delete]');
const $allClearButton = document.querySelector('[data-all-clear]');
const $prevOperandTextEl = document.querySelector('[data-prev-operand]');
const $currOperandTextEl = document.querySelector('[data-curr-operand]');
const $unoOperationButtons = document.querySelectorAll('[data-uno-operation]');

class Calculator {
    constructor($prevOperandTextEl, $currOperandTextEl) {
        this.$prevOperandTextEl = $prevOperandTextEl;
        this.$currOperandTextEl = $currOperandTextEl;
        this.clear();
    }

    clear () {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete () {
        this.currOperand = String(this.currOperand).slice(0, -1);
    }

    appendNum (num) {
        if(num === '.' && this.currOperand.includes('.')) return;
        this.currOperand += String(num);
    }

    chooseOperation(operation) {
        if(this.currOperand === '') return;
        if(this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    chooseUnoOperation(operation) {
        const curr = parseFloat(this.currOperand);
        if(this.currOperand === '') return;
        switch (this.operation) {
            case 'x2':
                Math.pow(curr, 2);
                break;
            case '√':
                Math.sqrt(curr);
                break;
            case '+/-':
                curr = -curr;
            default: 
                return;
        }
        this.currOperand = curr;
        this.operation = undefined;
        this.prevOperand = '';
    }

    compute () {
        let result = 0;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default: 
                return;
        }
        this.currOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(num) {
        return String(num).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
    }

    updateDisplay () {
        this.$currOperandTextEl.innerText = this.getDisplayNumber(this.currOperand);
        this.$prevOperandTextEl.innerText = (this.operation !== null && this.prevOperand) ? `${this.getDisplayNumber(this.prevOperand)} ${this.operation}` : '';
    }
}

const calculator = new Calculator($prevOperandTextEl, $currOperandTextEl);

$numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

$operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

$unoOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseUnoOperation(button.innerText);
        calculator.updateDisplay();
    })
})

$equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

$allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

$deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})