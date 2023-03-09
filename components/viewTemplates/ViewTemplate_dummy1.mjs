import { Component } from "../../core/Component.mjs";

export function ViewTemplate_dummy1() {
  Component.call(this);

  this.slots = [
    {
      slot: "slot1",
    },
    {
      slot: "slot2",
    },
  ];

  this.getHtml = function()
    {
      return `
        <div>
              <div>${this.slots[0].slot}</div>
              <div>${this.slots[1].slot}</div>
        </div>
      `;
    }
}