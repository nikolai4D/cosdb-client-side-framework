import { html2dom } from "../../core/helpers.mjs";

export function Atom_Dev2() {
  this.value = [{ value: "placeholder" }];

  const atom = () => this.value[0].value;

  const viewTemplate = async () => {
    return await html2dom`
    <p "class="atom_text3">${atom()}</p>`;
  };

  this.render = async () => {
    return await viewTemplate();
  };
}
