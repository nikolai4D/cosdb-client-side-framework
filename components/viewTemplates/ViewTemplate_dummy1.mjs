import { Component } from "../../core/Component.mjs";
import { slot } from  "../../core/helpers.mjs";

export function ViewTemplate_dummy1() {
  Component.call(this);

  this.slots = [
    {
      slot: "slot1",
      component: null
    },
    {
      slot: "slot2",
      component: null

    },
  ];

  this.getHtml = function()
    {
      return `
        <div>
              <div>${slot(this.slots[0].slot)}</div>
              <div>${slot(this.slots[1].slot)}</div>
        </div>
      `;
    }

}