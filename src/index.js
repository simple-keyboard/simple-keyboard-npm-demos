import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let selectedInput;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});

document.querySelectorAll(".input").forEach(input => {
  input.addEventListener("focus", onInputFocus);
  // Optional: Use if you want to track input changes
  // made without simple-keyboard
  input.addEventListener("input", onInputChange);
});

function onInputFocus(event) {
  selectedInput = `#${event.target.id}`;

  keyboard.setOptions({
    inputName: event.target.id
  });
}

function onInputChange(event) {
  keyboard.setInput(event.target.value, event.target.id);
}

function onChange(input) {
  console.log("Input changed", input);
  document.querySelector(selectedInput || ".input").value = input;
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * Shift functionality
   */
  if (button === "{lock}" || button === "{shift}") handleShiftButton();
}

function handleShiftButton() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}
