import { Atom } from "../../core/Atom.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";

export function Atom_Heading4() {
  Atom.call(this);

  const component = async (compData) => {
    const comp = await createElement(
      "h4",
      { class: await this.atom() },
      compData
    );
    return comp;
  };

  this.render = async (data = "H4 data placeholder") => {
    return await component(data);
  };
}
