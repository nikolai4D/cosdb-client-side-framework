export function Atom_dummy3() {
  this.value = [{ value: "value3" }];

  return `<div>
        <h1>${this.value[0].value}</h1>
      </div>
    `;
}
