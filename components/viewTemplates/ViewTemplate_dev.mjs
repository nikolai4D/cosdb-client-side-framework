import { html2dom } from "../../core/helpers.mjs";

export function ViewTemplate_dev() {
  this.slots = [
    {
      slot: "slot1",
      content: "slot1 content from template",
    },
  ];

  const slot = (slotName) =>
    this.slots.find((slot) => slot.slot === slotName)?.content || "";

  const viewTemplate = async () => {
    return await html2dom`
        <div>${slot("slot1")}</div>`;
  };

  this.render = async () => {
    return await viewTemplate();
  };
}
