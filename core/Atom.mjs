// export function Atom() {
//   this.title = "Atom";

//   this.value = [{ value: "placeholder" }];

//   this.atom = async function () {
//     return this.value[0].value;
//   };
// }

export function Atom() {
  this.title = "Atom";
  this.value = [{ value: "placeholder" }];

  this.atom = async function (index) {
    return this.value[index].value;
  };
}

// Add resolver function as a method of Atom class
Atom.prototype.resolver = async function (expression) {
  if (expression.startsWith("await this.atom")) {
    const index = parseInt(expression.match(/\d+/)[0], 10);
    return await this.atom(index);
  }
  // Add more conditions to handle other types of expressions
};

// Add processTemplateWithResolver function as a method of Atom class
Atom.prototype.processTemplateWithResolver = async function (template) {
  async function processTemplate(template, resolver) {
    const regex = /<\s*(\w+)([^>]*)>(\$\{(.+?)\})<\/\s*\1\s*>/g;
    const container = document.createElement("div");
    let match;

    while ((match = regex.exec(template)) !== null) {
      const tag = match[1];
      const attributes = match[2];
      const expression = match[4];

      const elem = document.createElement(tag);
      elem.innerHTML = attributes;
      elem.appendChild(await resolver(expression));
      container.appendChild(elem);
    }

    return container;
  }

  return await processTemplate(template, this.resolver.bind(this));
};
