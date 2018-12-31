import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});

let keyboardDOM = document.querySelector(".simple-keyboard");
let keyboardContainerDOM = document.querySelector(".keyboard-input-container");

/**
 * Keyboard show
 */
document.querySelector(".input").addEventListener("focus", event => {
  keyboardDOM.classList.add("show-keyboard");
});

/**
 * Keyboard hide
 */
document.addEventListener("click", event => {
  /**
   * If keyboard is shown and element clicked is not a child of keyboard container, hide keyboard.
   */
  if(keyboardDOM.classList.contains("show-keyboard") && !keyboardContainerDOM.contains(event.target)){
    keyboardDOM.classList.remove("show-keyboard");
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
}
