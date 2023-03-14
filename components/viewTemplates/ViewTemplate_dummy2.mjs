import { Component } from "../../core/Component.mjs";

export function ViewTemplate_dummy2() {
  Component.call(this);
  
  this.slots = [
    {
      slot: "slot3",
    },
    {
      slot: "slot4",
    },
  ];

  this.getHtml = function(){
  return `
    <div>
          <div>${this.slots[0].slot}</div>
          <div>${this.slots[1].slot}</div>
    </div>
  `;
  }
}
