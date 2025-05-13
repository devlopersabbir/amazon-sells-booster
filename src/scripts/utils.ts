import { ActionType } from "../@types/index.js";
import { currencyCode } from "../constants/index.js";

export const getAsinText = (element: Element) => {
  const asinElement = element.querySelector(
    "div.JanusSplitBox-module__row--yjQ5L"
  );
  if (!asinElement) return console.log("asin element not found on element");
  const asin = asinElement.lastChild?.textContent?.trim();
  if (!asin) return console.log("asin text content not found!");
  return asin;
};

export const getKatInput = (priceCell: Element) => {
  const katGroup = priceCell.querySelector("kat-input-group");
  const code = katGroup?.textContent?.trim().toUpperCase();

  if (!katGroup || !code || !currencyCode.includes(code)) return;

  const katInput = katGroup.querySelector("kat-input");
  return katInput;
};

export const changeKatInputIncrement = (
  katInput: Element,
  currentValue: number,
  INC_DEC_VALUE: number
) => {
  const newValue = parseFloat((currentValue + INC_DEC_VALUE).toFixed(2));

  if (newValue < 0) return;

  katInput.setAttribute("value", newValue.toString());

  const shadowInput = katInput.shadowRoot?.querySelector("input");
  if (shadowInput) {
    shadowInput.value = newValue.toString();
    shadowInput.dispatchEvent(new Event("input", { bubbles: true }));
    shadowInput.dispatchEvent(new Event("change", { bubbles: true }));
  }
};
export const changeKatInputDecrement = (
  katInput: Element,
  currentValue: number,
  INC_DEC_VALUE: number
) => {
  const newValue = parseFloat((currentValue - INC_DEC_VALUE).toFixed(2));

  if (newValue < 0) return "New value should be more then 0";

  katInput.setAttribute("value", newValue.toString());

  const shadowInput = katInput.shadowRoot?.querySelector("input");
  if (shadowInput) {
    shadowInput.value = newValue.toString();
    shadowInput.dispatchEvent(new Event("input", { bubbles: true }));
    shadowInput.dispatchEvent(new Event("change", { bubbles: true }));
  }
};
export const getLowestPrice = (element: Element) => {
  const displayPriceCells = element.querySelectorAll(
    "div.JanusReferencePrice-module__container--2Frzx"
  );
  const lowerPriceCell = displayPriceCells[displayPriceCells.length - 1];

  if (!lowerPriceCell) return console.log("lower price cell not found!");

  const lowerPriceElement = lowerPriceCell.querySelector(
    ".JanusReferencePrice-module__priceText--weT1m span"
  );
  const lowerPriceText = lowerPriceElement
    ? lowerPriceElement.textContent
    : null;
  if (!lowerPriceText) return console.log("lower price text not found!");
  // Extract numeric value from price string (e.g., "$13.77 + $0.00")
  const priceMatch = lowerPriceText.match(/\$([\d.]+)/);
  const lowerPrice = priceMatch ? parseFloat(priceMatch[1]) : null;
  return lowerPrice;
};
