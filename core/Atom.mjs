export function Atom() {
  this.title = "Atom";

  this.value = [{ value: "placeholder" }];

  this.atom = async function () {
    return await this.value[0].value;
  };
}
