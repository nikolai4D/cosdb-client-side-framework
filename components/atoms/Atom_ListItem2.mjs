//import { html2dom } from "../../core/helpers.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_ListIten2(data = "placeholder") {
  Atom.call(this);

  const component = async () => {
    const comp = await html2dom`
    <li "class="${await this.atom()}">${data}</li>`;
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
