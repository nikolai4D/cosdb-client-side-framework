import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  this.value = [{ value: "placeholder" }];

  const atom = async () => this.value[0].value;

  const component = async () => {
    const content = await html2dom`
    <button>${await atom()}</button>`;
    content.addEventListener("click", () => {
      console.log("clicked button");
    });
    return content;
  };

  //??? component() is now a DOM Element, how do I add an eventlistner here ????

  this.render = async () => {
    return await component();
  };
}
