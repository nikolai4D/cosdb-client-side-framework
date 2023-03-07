export function Atom_dummy2() {
  this.values = [
    {
      value: "value3",
    },
    {
      value: "value4",
    },
  ];
  return `<div>
          <h1>${this.values[0].value}</h1>
        </div>
      `;
}
