import { Component } from "../../core/Component.mjs";

export function ViewTemplate_dummy2() {
  this.slots = [
    {
      slot: "slot3",
    },
    {
      slot: "slot4",
    },
  ];

  return `
    <div>
          <div>${this.slots[0].slot}</div>
          <div>${this.slots[1].slot}</div>
    </div>
  `;
}
