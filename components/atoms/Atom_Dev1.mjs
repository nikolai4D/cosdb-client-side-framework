import { html2dom } from "../../core/helpers.mjs";
import { Atom } from "../../core/Atom.mjs";

export function Atom_Dev1() {
  Atom.call(this);

  //   const component = async () => {
  //     return await html2dom`
  //         <button>${await this.atom()}</button>`;
  //   };

  const component = async () => {
    const template = `<button>${await this.atom()}</button>`;
    const container = document.createElement("div");
    container.innerHTML = template;
    const button = container.querySelector("button");
    button.addEventListener("click", () => {
      console.log("button clicked");
    });
    return container;
  };

  this.render = async () => {
    return await component();
  };
}
