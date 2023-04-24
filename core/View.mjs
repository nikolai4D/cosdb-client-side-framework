// import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
// import { getViewTemplate } from "./getViewTemplate.mjs";
// import { createElement } from "./helpers/createElement.mjs";
// import { State } from "../data-mgmt/State.mjs";

// export async function View(viewPath) {
//   const type = "view";

//   //validate and authenticate path
//   const newView = await apiCallGet(`/auth/${viewPath}`);
//   const id = newView.id;
//   const value = newView.value;

//   //set components to state
//   if (!State.components) {
//     State.components = {};
//     State.components.viewTemplates = await apiCallGet(`/read/viewTemplates`);
//     State.components.slots = await apiCallGet(`/read/slots`);
//     State.components.components = await apiCallGet(`/read/components`);
//     State.components.organisms = await apiCallGet(`/read/organisms`);
//     State.components.molecules = await apiCallGet(`/read/molecules`);
//     State.components.atoms = await apiCallGet(`/read/atoms`);
//     State.components.atomValues = await apiCallGet(`/read/atomValues`);
//     State.components.functions = await apiCallGet(`/read/functions`);
//   }

//   //set browser history
//   window.history.pushState({ viewPath: value }, "", value);

//   //delete previous view
//   await deletePreviousView();

//   // Create a new viewTemplate
//   const divChild = await getViewTemplate(id);

//   // Create a new div from type
//   const div = await createElement("div", { class: type, id: id }, divChild);

//   // Append the view to the body
//   document.body.appendChild(div);
// }

// function deletePreviousView() {
//   const previousDiv = document.querySelector(".view");

//   if (previousDiv) {
//     previousDiv.remove();
//   }
// }

import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getViewTemplate } from "./getViewTemplate.mjs";
import { createElement } from "./helpers/createElement.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function View(viewPath) {
  const type = "view";

  // validate and authenticate path
  const newView = await apiCallGet(`/auth/${viewPath}`);
  const id = newView.id;
  const value = newView.value;

  // set components to state
  if (!State.components) {
    State.components = {};
    State.components.viewTemplates = await apiCallGet(`/read/viewTemplates`);
    State.components.slots = await apiCallGet(`/read/slots`);
    State.components.components = await apiCallGet(`/read/components`);
    State.components.organisms = await apiCallGet(`/read/organisms`);
    State.components.molecules = await apiCallGet(`/read/molecules`);
    State.components.atoms = await apiCallGet(`/read/atoms`);
    State.components.atomValues = await apiCallGet(`/read/atomValues`);
    State.components.functions = await apiCallGet(`/read/functions`);
  }

  // set browser history
  window.history.pushState({ viewPath: value }, "", value);

  // delete previous view
  await deletePreviousView();

  // create a new view template
  const newViewTemplate = await getViewTemplate(id);

  // create a new div from type
  const newDiv = await createElement(
    "div",
    { class: type, id: id },
    newViewTemplate
  );

  // get existing view divs
  const existingDivs = document.querySelectorAll(`.${type}`);

  // iterate over existing view divs
  existingDivs.forEach((existingDiv) => {
    // compare based on class name hierarchy
    if (existingDiv.classList.toString() === newDiv.classList.toString()) {
      // compare the two DOM structures
      const newChildren = Array.from(newDiv.children);
      const existingChildren = Array.from(existingDiv.children);

      // update existing elements with new text or attributes
      existingChildren.forEach((existingChild) => {
        const matchingChild = newChildren.find(
          (c) => c.classList.toString() === existingChild.classList.toString()
        );
        if (matchingChild) {
          // update text content
          if (existingChild.textContent !== matchingChild.textContent) {
            existingChild.textContent = matchingChild.textContent;
          }
          // update attributes
          for (const { name, value } of matchingChild.attributes) {
            if (existingChild.getAttribute(name) !== value) {
              existingChild.setAttribute(name, value);
            }
          }
        }
      });

      // append only new elements
      newChildren.forEach((newChild) => {
        const matchingChild = existingChildren.find(
          (c) => c.classList.toString() === newChild.classList.toString()
        );
        if (!matchingChild) {
          existingDiv.appendChild(newChild);
        }
      });
    }
  });

  // append the new view to the body if it doesn't exist
  if (!existingDivs.length) {
    document.body.appendChild(newDiv);
  }
}

function deletePreviousView() {
  const previousDivs = document.querySelectorAll(`.${type}`);

  previousDivs.forEach((previousDiv) => {
    previousDiv.remove();
  });
}
