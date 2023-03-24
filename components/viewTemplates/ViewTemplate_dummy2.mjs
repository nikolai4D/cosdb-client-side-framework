import { html2dom } from "../../core/helpers.mjs";

export function ViewTemplate_dummy2() {
  this.slots = [
    {
      slot: "slot3",
      content: "slot3 content",
    },
    {
      slot: "slot4",
      content: "slot4 content",
    },
  ];

  const slt = (slotName) => {
    const foundSlot = this.slots.find((s) => s.slot === slotName);
    return foundSlot ? foundSlot.content : "";
  };

  const comp = async () => {
    return await html2dom`
        <div><h1>${slt("slot3")}</h1></div>
        <div><h3>${slt("slot4")}</h3></div>
        <div><h5>${slt("slot3")}</h5></div>
        <div><h5>TEXT</h5></div>`;
  };

  this.render = async () => {
    return await comp();
  };
}
