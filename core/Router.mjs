import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
//import model_views
//import controller

export async function Router(viewPath) {
  //validate and authenticate path

  console.log({ viewPath });
  const newView = await apiCallGet(`/auth/${viewPath}`);
  const newPath = newView.viewPath; // newView = {viewPath: "viewPath"}

  //set browser history
  setPreviousViewToHistory(viewPath);

  //create view
  deletePreviousView();
  const newViewDiv = createView(newPath);

  //switch view
  document.body.appendChild(newViewDiv);
}

function setPreviousViewToHistory(viewPath) {
  window.history.pushState({ viewPath }, "", viewPath);
}

function deletePreviousView() {
  const previousDiv = document.querySelector("div");

  if (previousDiv) {
    previousDiv.remove();
  }
}

function createView(viewPath) {
  // Create a new <div> element
  const divElement = document.createElement("div");

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
  buttonElement.addEventListener("click", function (event) {
    // Prevent the default behavior of the button (submitting a form)
    event.preventDefault();

    // Get the input value and set the window location to it
    const inputValue = inputElement.value;
    window.location.pathname = inputValue;
  });

  // Set the text of the <h1> element to the input value
  h1Element.textContent = viewPath;

  // Append the <h1> element to the <div> element
  divElement.appendChild(h1Element);

  // Append the input field and button to the <div> element
  divElement.appendChild(inputElement);
  divElement.appendChild(buttonElement);

  return divElement;
}

// Add event listener for popstate event
window.addEventListener("popstate", async (event) => {
  if (event.state && event.state.viewPath) {
    const viewPath = event.state.viewPath;
    deletePreviousDiv();
    const newView = await apiCallGet(`/auth/${viewPath}`);
    const newPath = newView.viewPath;
    const newViewDiv = createView(newPath);
    document.body.appendChild(newViewDiv);
  }
});
