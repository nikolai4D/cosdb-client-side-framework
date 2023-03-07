export function Atom_dummy3() {
  this.values = [
    {
      value: "value5",
    },
    {
      value: "value6",
    },
  ];
  return `<div>
          <h1>${this.values[0].value}</h1>
        </div>
      `;
}
