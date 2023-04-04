//import { html2dom } from "../../core/helpers.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_ListItem2() {
  Atom.call(this);

  const component = async (compData) => {
    const comp = await createElement(
      "li",
      { class: await this.atom() },
      compData
    );
    return comp;
  };

  this.render = async (data = "data placeholder") => {
    return await component(data);
  };
}
