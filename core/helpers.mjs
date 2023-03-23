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

export function html2dom(strings, ...values) {
  const container = document.createElement("div");

  strings.forEach((string, index) => {
    container.insertAdjacentHTML("beforeend", string);

    if (values[index] instanceof HTMLElement) {
      container.appendChild(values[index].cloneNode(true));
    }
  });

  return container.childNodes;
}

export async function createComponent(type, file, content = null) {
  const pathToComponent = `../../components/${type}s/${file}.mjs`;
  const Component = await importModuleFromFile(pathToComponent, file);
  return Component[file]();
}

// export async function createViewTemplate(type, file, slots = []) {
//   const pathToComponent = `../../components/${type}s/${file}.mjs`;
//   const Component = await importModuleFromFile(pathToComponent, file);
//   const componentInstance = new Component[file]();
//   componentInstance.slots = slots;
//   return componentInstance;
// }

export async function createViewTemplate(type, file, slots = []) {
  const pathToComponent = `../../components/${type}s/${file}.mjs`;
  const Component = await importModuleFromFile(pathToComponent, file);
  const componentInstance = Component[file]();

  Object.defineProperty(componentInstance, "slots", {
    value: slots,
    writable: true,
  });

  return componentInstance;
}
