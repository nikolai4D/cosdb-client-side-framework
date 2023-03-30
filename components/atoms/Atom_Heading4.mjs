//import { html2dom } from "../../core/helpers.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Heading4(data = "H4 data placeholder") {
  Atom.call(this);

  const component = async () => {
    const comp = await html2dom`
    <h4 "class="atom_heading4">${data}</h4>`;
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
