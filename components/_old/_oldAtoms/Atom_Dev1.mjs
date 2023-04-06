//import { html2dom } from "../../core/helpers.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  const component = async () => {
    const comp = await html2dom`
          <button>${await this.atom()}</button>`;
    comp.onclick = () => {
      test(this.atom());
    };
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}

function test(atom) {
  console.log("clicked:", atom);
}
