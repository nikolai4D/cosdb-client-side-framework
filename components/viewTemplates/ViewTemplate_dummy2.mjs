import { html2dom } from "../../core/helpers.mjs";

export function ViewTemplate_dummy2() {
  this.slots = [
    {
      slot: "slot3",
    },
    {
      slot: "slot4",
    },
  ];

  const getSlot = async (slotName) => {
    const slt = this.slots.find((s) => s.slot === slotName);
    return slt ? await slt.slot : "";
  };

  const comp = async () => {
    return `
    <div>${await getSlot("slot3")}</div>
    <div>${await getSlot("slot4")}</div>
    <div>TEXT</div>
    `;
  };

  this.render = async () => {
    const dom = await html2dom`${await comp()}`;
    return dom;
  };
}

//  <div>${this.slots[0].slot}</div>
// <div>${this.slots[1].slot}</div>
