import { Router } from "./Router.mjs";

export async function ViewTester2(newView) {
  // Create a new <div> element
  const divElement = document.createElement("div");
  divElement.classList.add("viewContent");

  // Create a new <h1> element
  const h1Element = document.createElement("h1");
  h1Element.textContent = newView;
  divElement.appendChild(h1Element);

  // Create a new <input> element
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      buttonElement.click();
    }
  });
  divElement.appendChild(inputElement);

  // Create a new <button> element
  const buttonElement = document.createElement("button");
  buttonElement.textContent = "Go";
  buttonElement.addEventListener("click", async function (event) {
    event.preventDefault();
    const inputValue = inputElement.value;
    await Router(inputValue);
  });
  divElement.appendChild(buttonElement);

  // Append the <div> element to the <body> element
  return divElement;
}
