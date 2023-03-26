export function Atom() {
  this.title = "Atom";

  this.value = [{ value: "placeholder" }];

  this.atom = async function () {
    return this.value[0].value;
  };
}
