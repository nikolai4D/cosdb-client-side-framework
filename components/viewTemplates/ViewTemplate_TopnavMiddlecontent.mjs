//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { ViewTemplate } from "../../core/ViewTemplate.mjs";

export function ViewTemplate_TopnavMiddlecontent() {
  ViewTemplate.call(this);

  // sub components
  this.slots = [
    {
      slot: "topNav",
      content: "topNav content",
    },
    {
      slot: "middleContent",
      content: "middleContent",
    },
  ];

  //build component
  const component = async () => {
    const comp = await createElement(
      "div",
      { class: "ViewTemplate_TopnavMiddlecontent" },
      await createElement(
        "div",
        { class: "topNav" },
        await this.slot("topNav")
      ),
      await createElement(
        "div",
        { class: "middleContent" },
        await this.slot("middleContent")
      )
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async () => {
    return await component();
  };

  //add component specific functions here
}
