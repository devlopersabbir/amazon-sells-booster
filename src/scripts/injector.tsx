import { createRoot, Root } from "react-dom/client";
import Container from "./_components/Container.js";
import { Toaster } from "sonner";

// state variables
const container = document.createElement("div");
container.classList.add("inventory__container");
let root: Root;

function inject() {
  if (!container) return;
  root = createRoot(container);
  const rootContainer = document.querySelector(
    "div.HeaderBar-module__btnContainer--qeBey"
  );

  if (rootContainer) {
    rootContainer.appendChild(container);
    root.render(
      <>
        <Toaster position="bottom-center" />
        <Container />
      </>
    );
  }
}

export function main() {
  const rootContainer = document.querySelector(
    "div.HeaderBar-module__btnContainer--qeBey"
  );

  if (rootContainer) {
    rootContainer.appendChild(container);
  }

  inject();
}
