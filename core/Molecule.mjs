export function Molecule() {
  this.title = "Molecule";

  this.fn = function (id) {
    return this.functions.find((fn) => fn.id === id)?.function() || "";
  };

  this.atom = async function (id) {
    const component = Array.from(
      this.atoms.find((atom) => atom.id === id)?.component
    );
    return this.component.map((elem) => elem.outerHTML).join("");
  };
}
