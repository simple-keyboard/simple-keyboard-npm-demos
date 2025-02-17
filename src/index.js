import Keyboard from "simple-keyboard";

// Instead of the default import, you can also use this:
// import { SimpleKeyboard as Keyboard } from "simple-keyboard";

import "simple-keyboard/build/css/index.css";
import "./index.css";

let isMobileWidth;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
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

  if (button === "{shiftleft}" || button === "{shiftright}" || button === "{capslock}" || button === "{shift}" || button === "{lock}") handleShift();
  if (button === "{numbers}" || button === "{abc}") handleNumbers();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}

function handleNumbers() {
  let currentLayout = keyboard.options.layoutName;
  let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

  keyboard.setOptions({
    layoutName: numbersToggle
  });
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}

window.addEventListener('resize', resizeHandler);
window.addEventListener('orientationchange', resizeHandler);
resizeHandler();

function resizeHandler() {
  if (window.innerWidth <= 850) {
    if (!isMobileWidth) {
      isMobileWidth = true;
      keyboard.setOptions({
        mergeDisplay: true,
        layoutName: "default",
        theme: "hg-theme-default hg-layout-default hg-mobile-theme",
        layout: {
          'default': [
            'q w e r t y u i o p',
            'a s d f g h j k l',
            '{shiftleft} z x c v b n m {backspace}',
            '{numbers} {space} {ent}'
          ],
          'shift': [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            '{shiftleft} Z X C V B N M {backspace}',
            '{numbers} {space} {ent}'
          ],
          'numbers': [
            "1 2 3",
            "4 5 6",
            "7 8 9",
            "{abc} 0 {backspace}",
          ]
        },
        display: {
          "{numbers}": "123",
          "{ent}": "return",
          "{escape}": "esc ⎋",
          "{tab}": "tab ⇥",
          "{backspace}": "⌫",
          "{capslock}": "caps lock ⇪",
          "{shiftleft}": "⇧",
          "{shiftright}": "shift ⇧",
          "{controlleft}": "ctrl ⌃",
          "{controlright}": "ctrl ⌃",
          "{altleft}": "alt ⌥",
          "{altright}": "alt ⌥",
          "{metaleft}": "cmd ⌘",
          "{metaright}": "cmd ⌘",
          "{abc}": "ABC"
        }
      });
    }
  } else {
    if (isMobileWidth) {
      isMobileWidth = false;

      keyboard.setOptions({
        mergeDisplay: true,
        layoutName: "default",
        theme: "hg-theme-default hg-layout-default",
        layout: {
          'default': [
            '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
            '{tab} q w e r t y u i o p [ ] \\',
            '{capslock} a s d f g h j k l ; \' {enter}',
            '{shiftleft} z x c v b n m , . / {shiftright}',
            '.com @ {space}'
          ],
          'shift': [
            '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
            '{tab} Q W E R T Y U I O P { } |',
            '{capslock} A S D F G H J K L : " {enter}',
            '{shiftleft} Z X C V B N M < > ? {shiftright}',
            '.com @ {space}'
          ]
        },
        display: {}
      });
    }
  }
}