export function ViewTemplate_dummy1() {
  this.slots = [
    {
      slot: "slot1",
    },
    {
      slot: "slot2",
    },
  ];

  return `
  <div>
        <div>${this.slots[0].slot}</div>
        <div>${this.slots[1].slot}</div>
  </div>
`;
}
