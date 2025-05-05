export const createIncrement = (
  parent: HTMLElement,
  id: string = "inventory__increment-button"
) => {
  const button = document.createElement("button");
  button.setAttribute("id", id);
  button.textContent = "Increment";
  button.classList.add("inventory__increment-button", "button");
  parent.appendChild(button);
  return button;
};

export const createDecrement = (
  parent: HTMLElement,
  id: string = "inventory__decrement-button"
) => {
  const button = document.createElement("button");
  button.setAttribute("id", id);
  button.textContent = "Decrement";
  button.classList.add("inventory__decrement-button", "button");
  parent.appendChild(button);

  return button;
};
