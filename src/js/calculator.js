export class Calculator {
  constructor() {
    this.display = document.querySelector('.calculator-display') 
    this.buttons = document.querySelectorAll('.calculator-button') 
    this.history = document.querySelector('.calculator-history') 
    this.currentValue = '0' 
    this.operator = null 
    this.previousValue = null 
  }

  init() {
    let currentTheme = 'light'

    this.buttons.forEach((button) => {
      button.addEventListener('click', () => this.handleButtonClick(button)) // Adds click event listener to each button
    })

    const themeToggler = document.querySelector('.theme-toggler')
    const body = document.body

    themeToggler.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark'
      body.dataset.theme = currentTheme
    })
    document.addEventListener('keydown', (e) => {
      try {
        this.handleKeyPress(e)
      } catch (error) {
        console.error('Error calling handleKeyPress:', error)
      }
    })
  }
  handleButtonClick(button) {
    const value = button.textContent
    button.classList.add('pressed')

    setTimeout(() => {
      button.classList.remove('pressed')
    }, 200)
    if (
      this.display.textContent === 'undefined press AC to restart' ||
      (this.display.textContent === 'Error press AC to restart' &&
        value !== 'AC')
    ) {
      return
    } else if (button.classList.contains('equal')) {
      this.calculate()
    } else if (['+', '-', '×', '÷'].includes(value)) {
      this.handleOperator(value)
    } else if (value === 'AC') {
      this.clear()
    } else if (value === '+/-') {
      this.toggleSign()
    } else if (value === '%') {
      this.percentage()
    } else if (value === '.') {
      this.addDecimal()
    } else {
      this.appendNumber(value)
    }
  }
  handleKeyPress(event) {
    const keyValue = event.key
    let value
    if (
      this.display.textContent === 'undefined press AC' ||
      (this.display.textContent === 'Error press AC to restart' &&
        value !== 'AC')
    ) {
      return // Ignore all button presses except 'AC' if display is 'undefined'
    }

    if (keyValue === 'Enter') {
      value = '='
    } else if (
      keyValue === '+' ||
      keyValue === '-' ||
      keyValue === '*' ||
      keyValue === '/'
    ) {
      value = keyValue
    } else if (keyValue === '%') {
      value = '%'
    } else if (keyValue === '.') {
      value = '.'
    } else if (keyValue === 'Backspace') {
      this.currentValue = this.currentValue.slice(0, -1) || '0'
      this.updateDisplay()
      return
    } else if (keyValue >= '0' && keyValue <= '9') {
      value = keyValue
    } else {
      return // Ignore other keys
    }

    const button = Array.from(this.buttons).find(
      (button) => button.textContent === value
    ) // Finds the corresponding button

    if (button) {
      button.classList.add('pressed')
      setTimeout(() => {
        button.classList.remove('pressed')
      }, 200)
    }
    if (value === '=') {
      this.calculate()
    } else if (
      value === '+' ||
      value === '-' ||
      value === '*' ||
      value === '/'
    ) {
      this.handleOperator(value)
    } else if (value === '%') {
      this.percentage()
    } else if (value === '.') {
      this.addDecimal()
    } else {
      this.appendNumber(value)
    }
  }
  updateDisplay(value = this.currentValue) {
    if (value.endsWith(',') || value.endsWith('.')) {
      value = value.slice(0, -1)
    }
    // Convert to scientific notation if the number is too large
    if (parseFloat(value.replace(',', '.')) > 1e9) {
      value = parseFloat(value.replace(',', '.'))
        .toExponential()
        .replace('.', ',')
    }
    this.display.textContent = value.replace('.', ',')
  }

  displayError(message) {
    if (
      ![...this.history.children].some((child) =>
        child.textContent.includes(message)
      )
    ) {
      this.history.innerHTML += `<div class="error">Error: ${message}</div>`
    }
    this.updateDisplay('Error press AC to restart')
  }

  clear() {
    // Resets the calculator to its initial state
    this.previousValue = ''
    this.currentValue = '0'
    this.operator = null
    this.history.innerHTML = ''
    this.updateDisplay()
  }

  toggleSign() {
    // Toggles the sign of the current value
    this.currentValue = (parseFloat(this.currentValue) * -1).toString() // Converts the current value to a number, multiplies by -1, and converts back to a string
    this.updateDisplay()
  }

  percentage() {
    // Converts the current value to a percentage
    this.currentValue = (parseFloat(this.currentValue) / 100).toString() // Converts the current value to a number, divides by 100, and converts back to a string
    this.updateDisplay()
  }

  addDecimal() {
    // Adds a decimal point to the current value if it doesn't already contain one
    if (!this.currentValue.includes('.')) {
      // Checks if the current value already contains a comma
      this.currentValue += '.'
      
      this.updateDisplay()
    }
    
  }

  appendNumber(number) {
    // Appends a number to the current value
    if (this.currentValue === '0') {
      this.currentValue = number // Replaces the current value with the new number
    } else {
      this.currentValue += number // Appends the new number to the current value
    }
    this.updateDisplay()
  }

  handleOperator(operator) {
    // Handles the operator input
    if (this.operator) {
      // Checks if an operator is already set
      this.displayError('Operator already set')
      return
    }
      if (isNaN(parseFloat(this.currentValue))) {
    // Checks if the current value is a number
    this.displayError('Invalid input')
    return
  }
    this.previousValue = this.currentValue
    this.currentValue = '0' // Resets the current value to '0'
    this.operator = operator // Sets the operator
    this.updateDisplay(`${this.previousValue} ${operator}`)
  }

  calculate() {
    // Performs the calculation based on the current operator
    if (this.operator) {
      // Checks if an operator is set
      const prev = this.previousValue
      const current = this.currentValue
      const operator = this.operator

      this.updateDisplay(`${prev} ${operator} ${current}`) // Updates the display to show the calculation
      setTimeout(() => {
        // Delays the calculation to allow the display to update
        const result = this.performCalculation(prev, current, operator) // Performs the calculation
        if (result !== null) {
          // Checks if the result is valid
          this.updateDisplay(result)
        }
      }, 0)
    }
  }

  performCalculation(prev, current, operator) {
    // Performs the actual calculation
    const prevNum = parseFloat(prev.replace(',', '.')) // Converts the previous value to a number
    const currentNum = parseFloat(current.replace(',', '.')) // Converts the current value to a number

    if (isNaN(prevNum) || isNaN(currentNum)) {
      // Checks if either value is not a number
      this.displayError('Invalid values')
      this.clear()
      return null
    }

    const operations = {
      // Defines the operations
      '+': (a, b) => a + b, // Addition
      '-': (a, b) => a - b, // Subtraction
      '×': (a, b) => a * b, // Multiplication
      '*': (a, b) => a * b, // Multiplication
      '/': (a, b) => (b === 0 ? 'undefined press AC' : a / b), // Division with error handling for division by zero
      '÷': (a, b) => (b === 0 ? 'undefined press AC' : a / b), // Division with error handling for division by zero
    }

    const result = operations[operator]?.(prevNum, currentNum) // Performs the operation

    if (result === null) return null // Checks if the result is null

    const formattedResult = result.toString().replace('.', ',') // Formats the result
    this.currentValue = formattedResult
    this.addToHistory(`${prev} ${operator} ${current} = ${formattedResult}`) // Adds the calculation to the history
    this.operator = null // Clears the operator
    this.previousValue = this.currentValue
    return formattedResult
  }

  addToHistory(entry) {
    // Adds an entry to the calculation history
    if (
      ![...this.history.children].some((child) => child.textContent === entry)
    ) {
      // Checks if the entry is already in the history
      this.history.innerHTML += `<div>${entry}</div>` // Adds the entry to the history
      this.history.scrollTop = this.history.scrollHeight // Scrolls to the bottom of the history
    }
  }
}

const calculator = new Calculator()
calculator.init()
