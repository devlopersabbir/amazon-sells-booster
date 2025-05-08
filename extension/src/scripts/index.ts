import { HandlerOptions } from "../@types/index.js";
import { currencyCode } from "../constrants/index.js";

export function handleKatInputUpdate({
  type,
  INC_DEC_VALUE,
  asins = [],
  isAll = false,
}: HandlerOptions) {
  const selector = ".VolusPriceInputComposite-module__priceInputRow--1DG3s";
  const tableSelector = "div.JanusTable-module__tableContentRow--MGDsi";

  const parentElements = document.querySelectorAll(tableSelector);
  if (!parentElements.length) {
    console.log("No parent elements found");
    return;
  }

  Array.from(parentElements).forEach((element) => {
    if (!isAll) {
      const asinElement = element.querySelector(
        "div.JanusSplitBox-module__row--yjQ5L"
      );

      if (!asinElement) return console.log("asin element not found on element");
      const asin = asinElement.lastChild?.textContent?.trim();
      if (!asin) return console.log("asin text content not found!");

      if (asins.includes(asin)) {
        const priceCell = element.querySelector(
          "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
        );
        if (priceCell) {
          const katGroup = priceCell.querySelector("kat-input-group");
          const code = katGroup?.textContent?.trim().toUpperCase();

          if (!katGroup || !code || !currencyCode.includes(code)) return;

          const katInput = katGroup.querySelector("kat-input");

          if (!katInput) return;

          const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
          const newValue = parseFloat(
            (type === "increment"
              ? currentValue + INC_DEC_VALUE
              : currentValue - INC_DEC_VALUE
            ).toFixed(2)
          );

          if (newValue < 0) return;

          katInput.setAttribute("value", newValue.toString());

          const shadowInput = katInput.shadowRoot?.querySelector("input");
          if (shadowInput) {
            shadowInput.value = newValue.toString();
            shadowInput.dispatchEvent(new Event("input", { bubbles: true }));
            shadowInput.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      }
    } else {
      const priceCell = element.querySelector(
        "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
      );
      if (priceCell) {
        const katGroup = element.querySelector("kat-input-group");
        const code = katGroup?.textContent?.trim().toUpperCase();

        if (!katGroup || !code || !currencyCode.includes(code)) return;

        const katInput = katGroup.querySelector("kat-input");
        if (!katInput) return;

        const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
        const newValue = parseFloat(
          (type === "increment"
            ? currentValue + INC_DEC_VALUE
            : currentValue - INC_DEC_VALUE
          ).toFixed(2)
        );

        if (newValue < 0) return;

        katInput.setAttribute("value", newValue.toString());

        const shadowInput = katInput.shadowRoot?.querySelector("input");
        if (shadowInput) {
          shadowInput.value = newValue.toString();
          shadowInput.dispatchEvent(new Event("input", { bubbles: true }));
          shadowInput.dispatchEvent(new Event("change", { bubbles: true }));
        }

        console.log(`${type} to ${newValue}`);
      }
    }
  });
}
