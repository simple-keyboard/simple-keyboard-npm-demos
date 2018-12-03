import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let options = {
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "simple-keyboard hg-theme-default hg-layout-default",

  // To keep inputs syncronized
  syncInstanceInputs: true
};

let keyboard1 = new Keyboard(".keyboard1", {
  ...options
});

let keyboard2 = new Keyboard(".keyboard2", {
  ...options
});

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
  keyboard1.dispatch(instance => {
    let currentLayout = instance.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    instance.setOptions({
      layoutName: shiftToggle
    });
  });
}

/**
 * Button handler
 */
document.querySelector(".button").addEventListener("click", () => {
  let randomLetter = String.fromCharCode(
    65 + Math.floor(Math.random() * 26)
  ).toLowerCase();

  console.log(randomLetter);

  keyboard1.dispatch(instance => {
    instance.setOptions({
      buttonTheme: [
        {
          class: "myKey",
          buttons: randomLetter
        }
      ]
    });
  });
});
