//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { ViewTemplate } from "../../core/ViewTemplate.mjs";

export function ViewTemplate_X_Template() {
  ViewTemplate.call(this);

  // sub components
  this.slots = [
    {
      slot: "slot1",
      content: "slot1 content from template",
    },
  ];

  //build component
  const component = async () => {
    const comp = await createElement("div", {}, await this.slot("slot1"));

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async () => {
    return await component();
  };

  //add component specific functions here
}
