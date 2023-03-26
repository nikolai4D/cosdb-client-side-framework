import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  const component = async () => {
    const comp = await html2dom`
          <button>${await this.atom()}</button>`;
    console.log(comp);
    comp.addEventListener("click", () => {
      console.log("clicked");
    });
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
