import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  const component = async () => {
    const atom = await this.atom();
    const comp = await html2dom`
          <button>${atom}</button>`;

    comp.onclick = () => {
      test(atom);
    };

    console.log(comp);

    return comp;
  };

  this.render = async () => {
    return await component();
  };
}

function test(atom) {
  console.log("clicked:", atom);
}
