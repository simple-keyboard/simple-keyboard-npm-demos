import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

const defaultTheme = "hg-theme-default";

const keyboard = new Keyboard({
  theme: defaultTheme,
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button)
});

const inputDOM = document.querySelector(".input");

/**
 * Keyboard show
 */
inputDOM.addEventListener("focus", (event) => {
  showKeyboard();
});

/**
 * Keyboard show toggle
 */
document.addEventListener("click", (event) => {
  if (
    /**
     * Hide the keyboard when you're not clicking it or when clicking an input
     * If you have installed a "click outside" library, please use that instead.
     */
    !event.target.className.includes("input") &&
    !event.target.className.includes("hg-button") &&
    !event.target.className.includes("hg-row") &&
    !event.target.className.includes("simple-keyboard")
  ) {
    hideKeyboard();
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", (event) => {
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

function showKeyboard() {
  keyboard.setOptions({
    theme: `${defaultTheme} show-keyboard`
  });
}

function hideKeyboard() {
  keyboard.setOptions({
    theme: defaultTheme
  });
}
