import { Router } from "./Router.mjs";

export async function View(viewPath) {
  await deletePreviousView();
  // Create a new <div> element
  const divElement = document.createElement("div");
  divElement.classList.add("view");

  // Create a new <h1> element
  const h1Element = document.createElement("h1");

  // Create a new input field
  const inputElement = document.createElement("input");

  // Set the input type to text
  inputElement.setAttribute("type", "text");

  // Create a new button
  const buttonElement = document.createElement("button");

  // Set the button text to "Go"
  buttonElement.textContent = "Go";

  // Add a click event listener to the button
  buttonElement.addEventListener("click", async function (event) {
    // Prevent the default behavior of the button (submitting a form)
    event.preventDefault();

    // Get the input value and set the window location to it
    const inputValue = inputElement.value;
    await Router(inputValue);
  });

  // Add a keydown event listener to the input field
  inputElement.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter
    if (event.key === "Enter") {
      // Programmatically trigger a click event on the button
      buttonElement.click();
    }
  });

  // Set the text of the <h1> element to the input value
  h1Element.textContent = viewPath;

  // Append the <h1> element to the <div> element
  divElement.appendChild(h1Element);

  // Append the input field and button to the <div> element
  divElement.appendChild(inputElement);
  divElement.appendChild(buttonElement);

  document.body.appendChild(divElement);

  //   return divElement;
}

function deletePreviousView() {
  const previousDiv = document.getElementsByClassName("view");

  if (previousDiv) {
    previousDiv.remove();
  }
}
