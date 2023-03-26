import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  this.value = [{ value: "placeholder" }];

  const atom = async () => this.value[0].value;

  const component = async () => {
    return await html2dom`
    <h1>${await atom()}</h1>`;
  };

  const comp = component();

  comp.addEventListener("click", () => {
    //
  });

  this.render = async () => {
    return await comp;
  };
}
