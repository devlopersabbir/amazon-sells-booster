import { createDecrement, createIncrement } from "./button";

const INC_DEC_VALUE = 0.01;

function incrementHandler() {
  const parentElements = document.getElementsByClassName(
    "VolusPriceInputComposite-module__priceInputRow--1DG3s"
  );

  if (parentElements.length > 0) {
    Array.from(parentElements).forEach((element) => {
      const katInput = element.querySelector("kat-input");

      if (katInput) {
        // Get current value and parse it as a float
        const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
        // Calculate new value (increment)
        const newValue = (currentValue + INC_DEC_VALUE).toFixed(2);

        // Update the value attribute of kat-input
        katInput.setAttribute("value", newValue);

        // Update shadow DOM input if present
        const shadowRoot = katInput.shadowRoot;
        if (shadowRoot) {
          const input = shadowRoot.querySelector("input");
          if (input) {
            input.value = newValue;
            // Trigger input/change events to ensure UI updates
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }

        console.log(
          `${katInput.getAttribute("value")} Incremented value to ${newValue}`
        );
      } else {
        console.log("kat-input not found within element");
      }
    });
  } else {
    console.log("No parent elements found");
  }
}

function decrementHandler() {
  const parentElements = document.getElementsByClassName(
    "VolusPriceInputComposite-module__priceInputRow--1DG3s"
  );

  if (parentElements.length > 0) {
    Array.from(parentElements).forEach((element) => {
      const katInput = element.querySelector("kat-input");

      if (katInput && katInput.getAttribute("value")) {
        // Get current value and parse it as a float
        const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
        // Calculate new value (decrement)
        const newValue = (currentValue - INC_DEC_VALUE).toFixed(2);

        // Prevent negative values (optional, adjust as needed)
        if (parseFloat(newValue) >= 0) {
          // Update the value attribute of kat-input
          katInput.setAttribute("value", newValue);

          // Update shadow DOM input if present
          const shadowRoot = katInput.shadowRoot;
          if (shadowRoot) {
            const input = shadowRoot.querySelector("input");
            if (input) {
              input.value = newValue;
              // Trigger input/change events to ensure UI updates
              input.dispatchEvent(new Event("input", { bubbles: true }));
              input.dispatchEvent(new Event("change", { bubbles: true }));
            }
          }

          console.log(
            `${katInput.getAttribute("value")} Decremented value to ${newValue}`
          );
        } else {
          console.log("Cannot decrement below 0");
        }
      } else {
        console.log("kat-input not found within element");
      }
    });
  } else {
    console.log("No parent elements found");
  }
}

function main() {
  const rootContainer = document.querySelector(
    "div.HeaderBar-module__btnContainer--qeBey"
  );

  console.log("root: ", rootContainer);
  if (rootContainer) {
    const container = document.createElement("div");
    container.classList.add("inventory__container");

    const increment = createIncrement(container);
    const decrement = createDecrement(container);

    container.append(increment);
    container.append(decrement);
    rootContainer.appendChild(container);

    increment.addEventListener("click", incrementHandler);
    decrement.addEventListener("click", decrementHandler);
  } else {
    console.error(
      "Root container not found. Please verify the selector 'div.HeaderBar-module__btnContainer--qeBey'."
    );
  }
}

setTimeout(() => {
  main();
}, 4000);
