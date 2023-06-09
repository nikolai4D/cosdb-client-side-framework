//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { ViewTemplate } from "../../core/ViewTemplate.mjs";

export function ViewTemplate_TopnavCentercontent() {
  ViewTemplate.call(this);

  // sub components
  this.slots = [
    {
      slot: "topNav",
      content: null,
    },
    {
      slot: "centerContent",
      content: null,
    },
  ];

  //build component
  const component = async () => {
    const comp = await createElement(
      "div",
      { class: "viewtemplate_topnav_centercontent" },
      await createElement(
        "div",
        { class: "viewtemplate_topnav_centercontent__topnav" },
        await this.slot("topNav")
      ),
      await createElement(
        "div",
        { class: "viewtemplate_topnav_centercontent__centercontent" },
        await this.slot("centerContent")
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
