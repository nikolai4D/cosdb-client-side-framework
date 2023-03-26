import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  this.value = [{ value: "placeholder" }];

  const atom = async () => this.value[0].value;

  const component = async () => {
    return await html2dom`
    <button>${await atom()}</button>`;
  };

  //   this.render = async () => {
  //     return await component();
  //   };
  // }

  this.render = async () => {
    const comp = await component();
    console.log("comp", comp);
    const button = comp.querySelector("button");
    button.addEventListener("click", () => {
      console.log("clicked");
    });
    return comp;
  };
}
