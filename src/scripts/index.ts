import { HandlerOptions } from "../@types/index.js";
import { tableSelector } from "../constants/index.js";
import {
  changeKatInputDecrement,
  changeKatInputIncrement,
  getAsinText,
  getKatInput,
  getLowestPrice,
} from "./utils.js";

export function handleKatInputUpdate({
  type,
  INC_DEC_VALUE,
  asins = [],
  taskType = "All ASINs",
}: HandlerOptions) {
  const parentElements = document.querySelectorAll(tableSelector);
  if (!parentElements.length) return console.log("No parent elements found");

  Array.from(parentElements).forEach((element) => {
    switch (taskType) {
      case "All ASINs":
        // for all without asins array
        // note: if user select all then user can't select asins
        const priceCell = element.querySelector(
          "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
        );
        if (!priceCell) return;
        const katInput = getKatInput(priceCell);
        if (!katInput) return console.error("Kat input not found!");

        // once we got katinput then just change the kat inptu value
        const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
        return type === "increment"
          ? changeKatInputIncrement(katInput, currentValue, INC_DEC_VALUE)
          : changeKatInputDecrement(katInput, currentValue, INC_DEC_VALUE);

      case "Selected ASINs":
        // all with selected asins
        const asin = getAsinText(element);
        if (!asin) return console.log("asin text content not found!");

        // if asins array include the asin text then we have to update that one input
        if (asins.includes(asin)) {
          const priceCell = element.querySelector(
            "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
          );
          if (!priceCell) return;
          const katInput = getKatInput(priceCell);
          if (!katInput) return console.error("Kat input not found!");

          // once we got katinput then just change the kat inptu value
          const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
          type === "increment"
            ? changeKatInputIncrement(katInput, currentValue, INC_DEC_VALUE)
            : changeKatInputDecrement(katInput, currentValue, INC_DEC_VALUE);
        }

      case "w.r.t Lowest Price":
        if (asins.length) {
          const asin = getAsinText(element);
          if (!asin) return console.log("asin text content not found!");

          // if asins array include the asin text then we have to update that one input
          if (asins.includes(asin)) {
            const priceCell = element.querySelector(
              "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
            );
            if (!priceCell) return;
            const katInput = getKatInput(priceCell);
            if (!katInput) return console.error("Kat input not found!");

            const lowestPrice = getLowestPrice(element);
            if (!lowestPrice) return console.error("fail to get loweset price");
            type === "increment"
              ? changeKatInputIncrement(katInput, lowestPrice, INC_DEC_VALUE)
              : changeKatInputDecrement(katInput, lowestPrice, INC_DEC_VALUE);
          }
        } else {
          // without asins
          const priceCell = element.querySelector(
            "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
          );
          if (!priceCell) return;
          const katInput = getKatInput(priceCell);
          if (!katInput) return console.error("Kat input not found!");

          // once we got katinput then we have to get the lowest price
          const lowestPrice = getLowestPrice(element);
          if (!lowestPrice) return console.error("fail to get loweset price");

          type === "increment"
            ? changeKatInputIncrement(katInput, lowestPrice, INC_DEC_VALUE)
            : changeKatInputDecrement(katInput, lowestPrice, INC_DEC_VALUE);
        }
    }
  });
}
