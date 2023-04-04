export function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "className") {
      const classes = value.split(" ");
      for (const className of classes) {
        element.classList.add(className);
      }
    } else if (key === "id") {
      element.id = value;
    } else {
      element.setAttribute(key, value);
    }
  }

  for (const child of children) {
    console.log(child);
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }

  return element;
}
