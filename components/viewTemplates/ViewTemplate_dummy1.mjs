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
        <div>${this.slots.slot1}</div>
        <div>${this.slots.slot2}</div>
  </div>
`;
}
