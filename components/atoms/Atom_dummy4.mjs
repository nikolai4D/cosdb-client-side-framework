export function Atom_dummy4() {
  this.value = [{ value: "placeholder" }];

  return `<div>
        <h1>${this.value[0].value}</h1>
      </div>
    `;
}
