//import { html2dom } from "../../core/helpers.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_ListItem2(data = "list data placeholder") {
  Atom.call(this);

  const component = async () => {
    // const comp = await html2dom`
    //   <li class="${await this.atom()}">${data}</li>`;
    // return comp;

    const comp = await createElement("li", { class: await this.atom() }, data);
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
