//import { html2dom } from "../../core/helpers.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { Atom } from "../../core/Atom.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";

export function Atom_Heading4(data = "H4 data placeholder") {
  Atom.call(this);

  const atomVal = async () => {
    console.log(await this.atom());
  };
  atomVal();

  const component = async () => {
    // const comp = await html2dom`
    // <h4 "class="atom_heading4">${data}</h4>`;
    // return comp;
    const comp = await createElement("h4", { class: await this.atom() }, data);
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
