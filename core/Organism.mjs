export function Organism() {
  this.title = "Organism";

  this.fn = function (id) {
    return this.functions.find((fn) => fn.id === id)?.function() || "";
  };

  this.childOrganism = async (id, data) => {
    const component = this.organisms.find((mol) => mol.id === id)?.component;
    const comp = component.comp;
    const renderComp = await comp.render(data);
    return renderComp;
  };

  this.molecule = async (id, data) => {
    const component = this.molecules.find((mol) => mol.id === id)?.component;
    const comp = component.comp;
    const renderComp = await comp.render(data);
    return renderComp;
  };
}
