export function Atom_dummy1() {
  this.values = [
    {
      value: "value1",
    },
    {
      value: "value2",
    },
  ];
  return `<div>
      <h1>${this.values[0].value}</h1>
    </div>
  `;
}
