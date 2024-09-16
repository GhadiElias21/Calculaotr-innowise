![{E360B373-B410-49FC-B146-B60533651339}](https://github.com/user-attachments/assets/b8dc796f-161b-45dc-825e-41b1bf932276)

![{2EF4AE96-9BB7-4CC0-99A1-85933A200FEE}](https://github.com/user-attachments/assets/00252191-5120-4f70-80ee-70b474701818)






# Calculator Class

The `Calculator` class is a JavaScript implementation of a basic calculator that can perform arithmetic operations, handle keyboard input, and display calculation history.

## Live Preview

[Check out the live preview of the calculator here](https://inno-calco.netlify.app/)

## Constructor

The constructor initializes the calculator by:
- Selecting the display element
- Selecting all calculator buttons
- Selecting the history display element
- Initializing the current value, operator, and previous value to their default states

## Methods

### `init()`
Initializes the calculator by:
- Adding event listeners to the buttons
- Setting up the theme toggler

### `handleButtonClick(button)`
Manages button click events, updating the display and performing calculations based on the button pressed.

### `handleKeyPress(event)`
Handles keyboard input, mapping keys to calculator functions and updating the display accordingly.

### `updateDisplay(value = this.currentValue)`
Updates the calculator display, formatting numbers and converting large numbers to scientific notation if necessary.

### `displayError(message)`
Displays an error message on the calculator and logs it in the history.

### `clear()`
Resets the calculator to its initial state, clearing all values and the display.

### `toggleSign()`
Toggles the sign of the current value (positive/negative).

### `percentage()`
Converts the current value to a percentage.

### `addDecimal()`
Adds a decimal point to the current value if it doesn’t already contain one.

### `appendNumber(number)`
Adds a number to the current value being entered, updating the display accordingly.

### `handleOperator(operator)`
Sets the operator for the calculation and prepares the calculator for the next number input.

### `calculate()`
Performs the calculation based on the current and previous values and the selected operator, then updates the display with the result.

### `performCalculation(prev, current, operator)`
Executes the arithmetic operation based on the provided operator and values, handling special cases like division by zero.

### `addToHistory(entry)`
Adds a new entry to the calculation history, ensuring no duplicate entries.

## Usage

To use the `Calculator` class, create an instance of the class and call the `init()` method to set up the calculator.

```javascript
const calculator = new Calculator();
calculator.init();
