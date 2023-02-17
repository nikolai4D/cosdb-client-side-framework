export function ViewTemplate_dummy2() {
  this.slots = {
    slot1: null,
    slot2: null,
  };

  return `
    <div>
          <div>${this.slots.slot1}</div>
          <div>${this.slots.slot2}</div>
    </div>
  `;
}
