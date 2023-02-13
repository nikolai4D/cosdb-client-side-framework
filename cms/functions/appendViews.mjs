import { readModel } from "./readModel.mjs";
import { createNew } from "./createNew.mjs";
import { existingViews } from "./existingViews.mjs";

export async function appendViews() {
  const data = await readModel();

  // Define a function to create a nested set of div elements
  function createDivs(obj, indent = 0) {
    // Create a div for this object
    const div = document.createElement("div");

    // Indent the div using CSS
    div.style.marginLeft = `${indent}em`;

    // If the object has a "name" property, create a label and input
    if (obj.hasOwnProperty("name")) {
      const label = document.createElement("label");
      label.textContent = obj.name;
      div.appendChild(label);

      const input = document.createElement("input");
      input.type = "text";
      div.appendChild(input);
    }

    // Recursively create divs for any child objects
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        const childDiv = createDivs(obj[key], indent + 1);
        div.appendChild(childDiv);
      }
    }

    // Return the div
    return div;
  }

  // Call the createDivs function with the top-level object in the data
  const contentContainer = document.createElement("div");
  body.appendChild(contentContainer);
  const topLevelObject = data.views[0];
  const topLevelDiv = createDivs(topLevelObject);
  contentContainer.appendChild(topLevelDiv);

  //   const views = data.views;

  //   const keys = Object.keys(views);

  //   const body = document.querySelector("body");

  //   const createNewContainer = document.createElement("div");
  //   body.appendChild(createNewContainer);

  //   const existingViewsContainer = document.createElement("div");
  //   body.appendChild(existingViewsContainer);

  //   createNew(existingViewsContainer, createNewContainer, keys);
  //   existingViews(existingViewsContainer, views);
}
