export function Organism() {
  this.title = "Organism";

  this.fn = function (id) {
    return this.functions.find((fn) => fn.id === id)?.function() || "";
  };

  this.childOrganism = async (id, data) => {
    const component = this.organisms.find((org) => org.id === id)?.component;
    const comp = component.comp;
    const compChildOrganisms = component.organisms;
    const compMolecules = component.molecules;
    const compFunctions = component.functions;
    comp.organisms = compChildOrganisms;
    comp.molecules = compMolecules;
    comp.functions = compFunctions;
    const renderComp = await comp.render(data);
    return renderComp;
  };

  this.molecule = async (id, data) => {
    const component = this.molecules.find((mol) => mol.id === id)?.component;
    const comp = component.comp;
    const compAtoms = component.atoms;
    const compFunctions = component.functions;
    comp.atoms = compAtoms;
    comp.functions = compFunctions;
    const renderComp = await comp.render(data);
    return renderComp;
  };
}
