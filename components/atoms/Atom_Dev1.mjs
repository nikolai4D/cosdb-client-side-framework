import { html2dom } from "../../core/helpers.mjs";

export function Atom_Dev1() {
  this.value = [{ value: "placeholder" }];

  const atom = () => this.value[0].value;

  const viewTemplate = async () => {
    return await html2dom`
    <h1>${atom()}</h1>`;
  };

  this.render = async () => {
    return await viewTemplate();
  };
}
