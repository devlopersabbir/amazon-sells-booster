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
  taskType = "asins",
}: HandlerOptions) {
  const parentElements = document.querySelectorAll(tableSelector);
  if (!parentElements.length) return console.log("No parent elements found");

  Array.from(parentElements).forEach((element) => {
    switch (taskType) {
      case "all":
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

      case "asins":
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

      case "lowest-price":
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
              : null;
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
            : null;
        }
    }

    // if (taskType === "asins" && asins.length) {
    //   if (!asinElement) return console.log("asin element not found on element");
    //   const asin = asinElement.lastChild?.textContent?.trim();
    //   if (!asin) return console.log("asin text content not found!");

    //   if (asins.includes(asin)) {
    //     const priceCell = element.querySelector(
    //       "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
    //     );

    //     if (priceCell) {
    //       const katInput = getKatInput(priceCell);
    //       if (!katInput) return console.log("katinput not found");
    //       const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
    //       changeKatInput(katInput, type, currentValue, INC_DEC_VALUE);
    //     }
    //   }
    // } else if (taskType === "lowest-price") {
    //   if (!asinElement) return console.log("asin element not found on element");
    //   const asin = asinElement.lastChild?.textContent?.trim();
    //   if (!asin) return console.log("asin text content not found!");

    //   if (asins.length && asins.includes(asin)) {
    //     const priceCell = element.querySelector(
    //       "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
    //     );

    //     const lowerPrice = getLowestPrice(element);
    //     if (priceCell && lowerPrice) {
    //       const katInput = getKatInput(priceCell);
    //       if (!katInput) return;

    //       // send the lowerprice to make it increment and dicrement
    //       changeKatInput(katInput, type, lowerPrice, INC_DEC_VALUE);
    //     }
    //   } else {
    //     // for without asins
    //     const priceCell = element.querySelector(
    //       "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
    //     );

    //     const lowerPrice = getLowestPrice(element);
    //     if (priceCell && lowerPrice) {
    //       const katInput = getKatInput(priceCell);
    //       if (!katInput) return;
    //       changeKatInput(katInput, type, lowerPrice, INC_DEC_VALUE);
    //     }
    //   }
    // } else if (taskType === "all") {
    //   const priceCell = element.querySelector(
    //     "div.VolusPriceInputComposite-module__priceInputRow--1DG3s"
    //   );
    //   if (priceCell) {
    //     const katInput = getKatInput(priceCell);
    //     if (!katInput) return;

    //     const currentValue = parseFloat(katInput.getAttribute("value")!) || 0;
    //     changeKatInput(katInput, type, currentValue, INC_DEC_VALUE);
    //   }
    // }
  });
}
