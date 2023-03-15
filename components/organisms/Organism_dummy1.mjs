export async function Organism_dummy1() {
  this.organisms = [
    {
      id: 1,
      organism: "Organism_dummy2",
    },
  ];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_dummy1",
    },
    {
      id: 2,
      molecule: "Molecule_dummy2",
    },
  ];

  this.functions = [
    {
      id: 1,
      function: "placeholder",
    },
    {
      id: 2,
      function: "placeholder",
    },
  ];

  return `
  <div>
    <div>${await comp(org, 1)}</div>
    <div>${await comp(mol, 1)}</div>
    <div>${await comp(mol, 2)}</div>
  </div>
`;
}

function comp(type, id) {}
