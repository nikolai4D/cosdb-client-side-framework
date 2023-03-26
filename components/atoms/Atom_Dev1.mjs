import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  //this.value = [{ value: "placeholder" }];

  //const atom = () => this.value[0].value;

  const component = async () => {
    return await html2dom`
    <h1>${atom()}</h1>`;
  };

  //   this.render = async () => {
  //     return await component();
  //   };
}
