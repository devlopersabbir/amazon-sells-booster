import { ActionType, AsinGroup } from "../@types/index.js";

const INC_DEC_VALUE = 0.01;
export function inc_decHandler(type: ActionType, asins: AsinGroup["asins"]) {
  const parentElements = document.querySelectorAll(
    ".JanusTable-module__tableContentRow--MGDsi"
  );

  if (parentElements.length > 0) {
    Array.from(parentElements).forEach((element) => {
      const asin = element.querySelector(
        "div.JanusSplitBox-module__row--yjQ5L > div:nth-child(2) span"
      );

      if (!asin || !asin?.textContent)
        return console.log("asin span not found!");
      if (asins.includes(asin.textContent?.trim())) {
        const katInput = element.querySelector("kat-input");
        if (!katInput) return console.log("kat input not found");

        // Get current value and parse it as a float
        const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
        // Calculate new value (increment)
        const newValue =
          type === "increment"
            ? (currentValue + INC_DEC_VALUE).toFixed(2)
            : (currentValue - INC_DEC_VALUE).toFixed(2);

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
      }
    });
  } else {
    console.log("No parent elements found");
  }
}
