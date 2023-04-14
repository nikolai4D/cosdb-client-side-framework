export function Molecule() {
  this.title = "Molecule";

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

  this.atom = async function (id, data) {
    const component = this.atoms.find((atom) => atom.id === id)?.component;
    const comp = component.comp;
    const compValue = component.value;
    comp.value = [{ value: compValue[0].value }];

    const renderComp = await comp.render(data);
    return renderComp;
  };
}
