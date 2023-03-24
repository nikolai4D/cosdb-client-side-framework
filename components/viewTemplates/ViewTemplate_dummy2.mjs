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

  const slot = (slotName) =>
    this.slots.find((slot) => slot.slot === slotName)?.content || "";

  const viewTemplate = async () => {
    return await html2dom`
        <div><h1>${slot("slot3")}</h1></div>
        <div><h3>${slot("slot4")}</h3></div>
        <div><h5>${slot("slot3")}</h5></div>
        <div><h5>TEXT</h5></div>`;
  };

  this.render = async () => {
    return await viewTemplate();
  };
}
