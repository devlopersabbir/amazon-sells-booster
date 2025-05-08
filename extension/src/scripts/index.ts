import { HandlerOptions } from "../@types/index.js";
import { currencyCode } from "../constrants/index.js";

export function handleKatInputUpdate({
  type,
  INC_DEC_VALUE,
  asins = [],
  isAll = false,
}: HandlerOptions) {
  const isIncrement = type === "increment";
  const selector = isAll
    ? ".VolusPriceInputComposite-module__priceInputRow--1DG3s"
    : ".JanusTable-module__tableContentRow--MGDsi";

  const parentElements = document.querySelectorAll(selector);
  if (!parentElements.length) {
    console.log("No parent elements found");
    return;
  }

  parentElements.forEach((element) => {
    if (!isAll) {
      const asin = element
        .querySelector(
          "div.JanusSplitBox-module__row--yjQ5L > div:nth-child(2) span"
        )
        ?.textContent?.trim();

      if (!asin || !asins.includes(asin)) return;
    }

    const katGroup = element.querySelector("kat-input-group");
    const code = katGroup?.textContent?.trim().toUpperCase();

    if (!katGroup || !code || !currencyCode.includes(code)) return;

    const katInput = katGroup.querySelector("kat-input");
    if (!katInput) return;

    const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
    const newValue = parseFloat(
      (isIncrement
        ? currentValue + INC_DEC_VALUE
        : currentValue - INC_DEC_VALUE
      ).toFixed(2)
    );

    if (!isAll && newValue < 0) return;

    katInput.setAttribute("value", newValue.toString());

    const shadowInput = katInput.shadowRoot?.querySelector("input");
    if (shadowInput) {
      shadowInput.value = newValue.toString();
      shadowInput.dispatchEvent(new Event("input", { bubbles: true }));
      shadowInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    console.log(
      `${isIncrement ? "Incremented" : "Decremented"} to ${newValue}`
    );
  });
}
