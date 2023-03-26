export function Organism() {
  this.title = "Organism";

  this.fn = function (id) {
    return this.functions.find((fn) => fn.id === id)?.function() || "";
  };

  this.childOrganism = (id) => {
    const component = this.organisms.find(
      (childOrg) => childOrg.id === id
    )?.component;
    const componentArray = component ? Array.from(component) : [];
    return componentArray.map((elem) => elem.outerHTML).join("");
  };

  this.molecule = async (id) => {
    const component = this.molecules.find((mol) => mol.id === id)?.component;
    const componentArray = component ? Array.from(component) : [];
    return componentArray.map((elem) => elem.outerHTML).join("");
  };
}
