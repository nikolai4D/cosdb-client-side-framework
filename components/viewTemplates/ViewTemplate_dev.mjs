import { html2dom } from "../../core/helpers.mjs";
import { ViewTemplate } from "../../core/ViewTemplate.mjs";

export function ViewTemplate_dev() {
  ViewTemplate.call(this);
  this.slots = [
    {
      slot: "slot1",
      content: "slot1 content from template",
    },
  ];

  const component = async () => {
    return await html2dom`
        <div>${this.slot("slot1")}</div>`;
  };

  this.render = async () => {
    return await component();
  };
}
