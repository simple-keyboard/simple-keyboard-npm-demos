import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});

let inputDOM = document.querySelector(".input");

/**
 * Keyboard show
 */
inputDOM.addEventListener("focus", event => {
  keyboard.keyboardDOM.classList.add("show-keyboard");
});

/**
 * Keyboard show toggle
 */
document.addEventListener("click", event => {
  if (
    // Target is not keyboard element
    event.target !== keyboard.keyboardDOM &&
    // Target is not the input
    event.target !== inputDOM &&
    // Target is not a keyboard button
    !event.target.classList.contains("hg-button")
  ) {
    hideKeyboard();
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });

  showKeyboard();
}

function showKeyboard() {
  keyboard.keyboardDOM.classList.add("show-keyboard");
}

function hideKeyboard() {
  keyboard.keyboardDOM.classList.remove("show-keyboard");
}
