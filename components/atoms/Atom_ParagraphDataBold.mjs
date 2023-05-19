//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_ParagraphDataBold() {
  Atom.call(this);

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "p",
      { class: `${await this.atom()} atom_paragraphdatabold`, id: compData.id },
      compData.title
    );
    //add event listeners here
    return comp;
  };

  //render component
  this.render = async (
    data = { title: "data placeholder", id: "id placeholder" }
  ) => {
    return await component(data);
  };

  //add component specific functions here
}
