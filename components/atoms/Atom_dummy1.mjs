export function Atom_dummy1() {
  this.value = [{ value: "value1" }];

  return `<div>
      <h1>${this.value[0].value}</h1>
    </div>
  `;
}
