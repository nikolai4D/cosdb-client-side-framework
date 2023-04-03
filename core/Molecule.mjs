export function Molecule() {
  this.title = "Molecule";

  this.fn = function (id) {
    return this.functions.find((fn) => fn.id === id)?.function() || "";
  };
  this.atom = function (id) {
    const component = this.atoms.find((atom) => atom.id === id)?.component;

    return component;
  };
}

//   this.atom = async function (id) {
//     const component = this.atoms.find((atom) => atom.id === id)?.component;
//     const container = document.createElement("div");
//     container.appendChild(component);
//     return container;
//   };
// }

// this.atom = function (id) {
//     const component = this.atoms.find((atom) => atom.id === id)?.component;

//     return component;
//   };
// }