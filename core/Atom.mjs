export function Atom() {
  this.value = [{ value: "placeholder" }];

  Atom.prototype.atom = () => {
    return this.value[0].value;
  };
}
