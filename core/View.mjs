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

const type = "view";

function compareClassLists(a, b) {
  const classListA = new Set(a.classList);
  const classListB = new Set(b.classList);
  return (
    a.length === b.length &&
    [...classListA].every((value) => classListB.has(value))
  );
}

function updateExistingElements(newChildren, existingChildren) {
  existingChildren.forEach((existingChild) => {
    const matchingChild = newChildren.find((c) =>
      compareClassLists(c, existingChild)
    );
    if (matchingChild) {
      updateElement(existingChild, matchingChild);
    } else {
      existingChild.remove();
    }
  });
}

function updateElement(existingChild, matchingChild) {
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

function appendNewElements(newChildren, existingDiv) {
  newChildren.forEach((newChild) => {
    const matchingChild = existingChildren.find((c) =>
      compareClassLists(c, newChild)
    );
    if (!matchingChild) {
      existingDiv.appendChild(newChild);
    }
  });
}

export async function View(viewPath) {
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
    if (compareClassLists(existingDiv, newDiv)) {
      const newChildren = Array.from(newDiv.children);
      const existingChildren = Array.from(existingDiv.children);
      updateExistingElements(newChildren, existingChildren);
      appendNewElements(newChildren, existingDiv);
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
