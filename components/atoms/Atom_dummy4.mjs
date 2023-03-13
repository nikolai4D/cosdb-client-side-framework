export function Atom_dummy4() {
  this.value = [{ value: "value4" }];

  return `<div>
        <h1>${this.value[0].value}</h1>
      </div>
    `;
}
