export function Atom_dummy2() {
  this.value = { value: "value2" };

  return `<div>
        <h1>${this.value.value}</h1>
      </div>
    `;
}
