export function Molecule() {
  this.title = "Molecule";

  this.fn = function (id) {
    return this.functions.find((fn) => fn.id === id)?.function() || "";
  };
  this.atom = async function (id, data) {
    const component = this.atoms.find((atom) => atom.id === id)?.component;

    const comp = component.comp;
    const compValue = component.value;
    comp.value = [{ value: compValue[0].value }];
    console.log(comp, data);

    const renderComp = await comp.render(data);
    return renderComp;
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
