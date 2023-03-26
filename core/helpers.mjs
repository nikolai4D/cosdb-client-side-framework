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

//   return await container.childNodes;
// }

export function html2dom(strings, ...values) {
  console.log("html2dom", "strings:", strings, "values:", values);
  const container = document.createElement("div");

  for (let i = 0; i < strings.length; i++) {
    const string = strings[i].trim();
    container.appendChild(document.createTextNode(string));
    if (values[i]) {
      let value = null;
      if (values[i] instanceof HTMLElement) {
        value = values[i];
      } else if (typeof values[i] === "string") {
        value = document.createTextNode(values[i].trim());
      } else {
        console.error(`Invalid value: ${values[i]}`);
      }
      if (value) {
        container.appendChild(value);
      }
    }
  }

  if (container.children.length > 1) {
    const wrapper = document.createElement("div");
    Array.from(container.childNodes).forEach((node) => {
      wrapper.appendChild(node);
    });
    return wrapper;
  } else {
    return container.firstChild;
  }
}

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
