export function Atom() {
  this.value = [{ value: "placeholder" }];

  this.atom = () => {
    return this.value[0].value;
  };
}
