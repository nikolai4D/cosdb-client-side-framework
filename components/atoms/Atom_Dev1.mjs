import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  const component = async () => {
    return await html2dom`
      <button>${await this.atom()}</button>`;
  };

  this.render = async () => {
    return await component();
  };
}
