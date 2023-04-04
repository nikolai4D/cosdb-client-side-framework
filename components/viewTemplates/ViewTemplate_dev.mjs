// import { html2dom } from "../../core/helpers.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
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
    // const comp = document.createElement("div");
    // comp.appendChild(await this.slot("slot1"));
    const comp = await createElement("div", {}, await this.slot("slot1"));
    return comp;
  };

  //     await html2dom`
  //         <div>${await this.slot("slot1")}</div>`;
  //   };

  this.render = async () => {
    return await component();
  };
}
