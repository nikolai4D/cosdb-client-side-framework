import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev2() {
  Atom.call(this);

  const component = async () => {
    return await html2dom`
    <p "class="atom_text3">${await this.atom()}</p>`;
  };

  this.render = async () => {
    return await component();
  };
}
