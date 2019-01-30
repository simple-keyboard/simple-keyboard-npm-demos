import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});

updateInputStatusMessage();

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  let input = event.target.value;
  keyboard.setInput(input);
  updateInputStatusMessage(input);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  updateInputStatusMessage(input);
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

function getInputStatus(input){
  let inputStatus;

  if (input) {
    inputStatus = input.match(pattern) ? "correct" : "incorrect";
  } else {
    inputStatus = "empty";
  }

  return inputStatus;
}

function updateInputStatusMessage(input){
  let inputStatus = getInputStatus(input);
  document.querySelector('.inputStatusMessage').innerHTML = inputStatus;
  document.querySelector('.inputStatus').className = `inputStatus ${inputStatus}`;
  document.querySelector('.input').className = `input ${inputStatus}`;
}
