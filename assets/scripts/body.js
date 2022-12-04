// export default {
//     elements: {
//         wrapperBody: null,
//         numKeys: [],
//         numKey: null,
//         operKeys: [],
//         operKey: null,
//         unoKeys: [],
//         output: null,
//         equalsButton: null,
//         deleteButton: null,
//         allClearButton: null,
//         prevOperand: null,
//         currOperand: null,
//         plus: null,
//         minus: null,
//         del: null,
//         multi: null,
//         dott: null,
//         negative: null,
//         square: null,
//         extent: null,
//     },
  
//     init() {

//         this.elements.wrapperBody = document.createElement('div')
//         this.elements.output = document.createElement('div')
//         this.elements.equalsButton = document.createElement('button')
//         this.elements.operKey = document.createElement('button')
//         this.elements.deleteButton = document.createElement('button')
//         this.elements.allClearButton = document.createElement('button')
//         this.elements.prevOperand = document.createElement('div')
//         this.elements.currOperand = document.createElement('div')
//         this.elements.plus = document.createElement('button')
//         this.elements.minus = document.createElement('button')
//         this.elements.del = document.createElement('button')
//         this.elements.multi = document.createElement('button')
//         this.elements.dott = document.createElement('button')
//         this.elements.negative = document.createElement('button')
//         this.elements.square = document.createElement('button')
//         this.elements.extent = document.createElement('button')

//         this.elements.wrapperBody.classList.add('wrapper')
//         this.elements.output.classList.add('output')
//         this.elements.equalsButton.classList.add('span-two')
//         this.elements.allClearButton.classList.add('span-two')
//         this.elements.deleteButton.classList.add('span-two')
//         this.elements.deleteButton.classList.add('delete')
//         this.elements.allClearButton.classList.add('all-clear')
//         this.elements.prevOperand.classList.add('prev-operand')
//         this.elements.currOperand.classList.add('curr-operand')

//         this.elements.equalsButton.innerHTML = '='
//         this.elements.deleteButton.innerHTML = 'DEL'
//         this.elements.allClearButton.innerHTML = 'AC'
//         this.elements.prevOperand.innerHTML = ''
//         this.elements.currOperand.innerHTML = '0'
//         this.elements.plus.innerHTML = '+'
//         this.elements.minus.innerHTML = '-'
//         this.elements.del.innerHTML = '÷'
//         this.elements.multi.innerHTML = '*'
//         this.elements.dott.innerHTML = '.'
//         this.elements.negative.innerHTML = '+/-'
//         this.elements.square.innerHTML = 'x<sup>x</sup>'
//         this.elements.extent.innerHTML = '√'

//         const bodyContent = document.querySelector('main')
//         bodyContent.appendChild(this.elements.wrapperBody)
//         this.elements.output.appendChild(this.elements.prevOperand)
//         this.elements.output.appendChild(this.elements.currOperand)
//         this.elements.wrapperBody.appendChild(this.elements.output)
//         this.elements.wrapperBody.appendChild(this.elements.deleteButton)
//         this.elements.wrapperBody.appendChild(this.elements.allClearButton)

//         for (let i = 0; i < 10; i++) {
//             this.elements.numKey = document.createElement('button')
//             this.elements.numKey.innerHTML = i
//             this.elements.numKeys.push(this.elements.numKey)
//             this.elements.wrapperBody.appendChild(this.elements.numKey)
//         }

//         this.elements.operKeys.push(this.elements.plus, this.elements.minus, this.elements.del, this.elements.multi, this.elements.square)
//         this.elements.unoKeys.push(this.elements.negative, this.elements.extent)
//         this.elements.numKeys.push(this.elements.dott)

//         this.elements.wrapperBody.appendChild(this.elements.plus)
//         this.elements.wrapperBody.appendChild(this.elements.minus)
//         this.elements.wrapperBody.appendChild(this.elements.del)
//         this.elements.wrapperBody.appendChild(this.elements.multi)
//         this.elements.wrapperBody.appendChild(this.elements.dott)
//         this.elements.wrapperBody.appendChild(this.elements.negative)
//         this.elements.wrapperBody.appendChild(this.elements.square)
//         this.elements.wrapperBody.appendChild(this.elements.extent)
//         this.elements.wrapperBody.appendChild(this.elements.equalsButton)
        
//         return this.elements
//     },
//   }



export default body;