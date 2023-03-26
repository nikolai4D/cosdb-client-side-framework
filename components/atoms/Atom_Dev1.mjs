import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  this.value = [{ value: "placeholder" }];

  const atom = async () => this.value[0].value;

  const component = async () => {
    const comp = await html2dom`
    <button>${await atom()}</button>`;
    comp.addEventListener("click", () => {
      "clicked";
    });
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
