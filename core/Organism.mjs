export function Organism() {
  this.title = "Organism";

  this.fn = async function (id, data = null) {
    const fn = this.functions.find((fn) => fn.id === id);
    if (fn) {
      if (data) {
        return await fn.function(data);
      } else if (fn.parameters !== "") {
        // test if it is an object or array
        if (typeof fn.parameters === "string") {
          try {
            fn.parameters = JSON.parse(fn.parameters);
            return await fn.function(fn.parameters);
          } catch (error) {
            console.log(error);
          }
        } else if (
          typeof fn.parameters === "object" &&
          fn.parameters !== null
        ) {
          return await fn.function(fn.parameters);
        } else if (Array.isArray(fn.parameters)) {
          return await fn.function(fn.parameters);
        }
      } else {
        return await fn.function();
      }
    } else {
      return null;
    }
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

// this.fn = async function (id, data = null) {
//     const fn = this.functions.find((fn) => fn.id === id);
//     console.log("fn: ", fn);
//     if (fn) {
//       if (data) {
//         return await fn.function(data);
//       } else if (fn.parameters !== "") {
//         return await fn.function(fn.parameters);
//       } else {
//         return await fn.function();
//       }
//     } else {
//       return null;
//     }

//   };
