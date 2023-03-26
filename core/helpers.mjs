/**
 * Take a string and make it into an HTML element.
 * !!! Do not work with sub table tags (tr, td, thead, tbody) !!!
 * @param {string} string
 * @returns {Element}
 */
export function stringToHTMLElement(string) {
  const frame = document.createElement("div");

  frame.insertAdjacentHTML("afterbegin", string);

  return frame.firstElementChild;
}

export async function importModuleFromFile(path, filename) {
  const module = await import(`${path}`);
  return module;
}

export const slot = (name) => `<div data-slot="${name}" class="slot"></div>`;

//1st
// export async function html2dom(strings, ...values) {
//   console.log("html2dom", "strings:", strings, "values:", values);
//   const container = document.createElement("div");
//   let interpolatedHTML = "";

//   for (const [index, string] of strings.entries()) {
//     interpolatedHTML += string;

//     if (values[index] !== undefined) {
//       if (values[index] instanceof HTMLElement) {
//         interpolatedHTML += values[index].outerHTML;
//       } else {
//         interpolatedHTML += values[index];
//       }
//     }
//   }

//   container.innerHTML = interpolatedHTML;

//   return await container;
//   //   return await container.childNodes
// }

//2nd
export async function html2dom(strings, ...values) {
  console.log("html2dom", "strings:", strings, "values:", values);
  const container = document.createDocumentFragment();
  const wrapper = document.createElement("div");

  for (const [index, string] of strings.entries()) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = string;
    while (tempDiv.firstChild) {
      container.appendChild(tempDiv.firstChild);
    }

    if (values[index] !== undefined) {
      if (values[index] instanceof HTMLElement) {
        container.appendChild(values[index]);
      } else {
        const textNode = document.createTextNode(values[index]);
        container.appendChild(textNode);
      }
    }
  }

  wrapper.appendChild(container);

  // Return the only child element when there's one child, otherwise return the wrapper element
  return wrapper.children.length === 1 ? wrapper.children[0] : wrapper;
}

//3rd

// export async function html2dom(strings, ...values) {
//   console.log("html2dom", "strings:", strings, "values:", values);
//   const container = document.createElement("div");
//   let interpolatedHTML = "";

//   for (const [index, string] of strings.entries()) {
//     interpolatedHTML += string;

//     if (values[index] !== undefined) {
//       if (values[index] instanceof HTMLElement) {
//         interpolatedHTML += values[index].outerHTML;
//       } else {
//         interpolatedHTML += values[index];
//       }
//     }
//   }

//   container.innerHTML = interpolatedHTML;

//   return await container.firstElementChild;
// }

export async function createComponent(type, file) {
  const pathToComponent = `../../components/${type}s/${file}.mjs`;
  const Component = await importModuleFromFile(pathToComponent, file);
  const component = new Component[file]();
  return component;
}

export async function createAction(parameters = null, file) {
  const pathToAction = `../../data-mgmt/actions/${file}.mjs`;
  const Action = await importModuleFromFile(pathToAction, file);

  const action = new Action[file](parameters);

  return action;
}

// export async function createViewTemplate(type, file) {
//   const pathToComponent = `../../components/${type}s/${file}.mjs`;
//   const viewTemplateComponent = await importModuleFromFile(
//     pathToComponent,
//     file
//   );
//   const viewTemplateComp = new viewTemplateComponent[file]();

//   return viewTemplateComp;
// }
