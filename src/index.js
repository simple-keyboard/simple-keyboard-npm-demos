import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
      "\uD83D\uDE00 \uD83D\uDE01 \uD83D\uDE02 \uD83D\uDE03 \uD83D\uDE04 \uD83D\uDE05",
      "\uD83D\uDE06 \uD83D\uDE07 \uD83D\uDE09 \uD83D\uDE0A \uD83D\uDE0B \uD83D\uDE0C",
      "\uD83D\uDE0D \uD83D\uDE0E \uD83D\uDE0F \uD83D\uDE10 \uD83D\uDE11 \uD83D\uDE12",
      "{bksp}"
    ]
  },
  display: {
    "{enter}": "submit",
    "{bksp}": "backspace",
    "{lock}": "lock",
    "{shift}": "shift",
    "{tab}": "tab",
    "{space}": " "
  },
  layoutName: "default",
  theme: "hg-theme-default emoji-theme"
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
