export function Molecule() {
  this.title = "Molecule";

  this.fn = async function (id) {
    const fn = this.functions.find((fn) => fn.id === id);
    if (fn) {
      console.log(fn);

      return await fn.function(fn.parameters);
    } else {
      return "";
    }
    // return this.functions.find((fn) => fn.id === id)?.function() || "";
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
