import { Atom_ListItem2 } from "../atoms/Atom_ListItem2.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { Molecule } from "../../core/Molecule.mjs";

export function Molecule_ListWHeading2(data = null) {
  Molecule.call(this);
  this.atoms = [
    {
      id: 1,
      atom: "Atom_Heading4",
      component: new Atom_Heading4(),
    },
    {
      id: 2,
      atom: "Atom_ListItem2",
      component: new Atom_ListItem2(),
    },
  ];

  this.functions = [];

  const list = [
    { title: "list item 1" },
    { title: "list item 2" },
    { title: "list item 3" },
  ];

  const listItems = (list) =>
    list
      .map((item) => {
        return `<li class="molecule_list__list_item">${item.title}</li>`;
      })
      .join("");

  const component = async () => {
    const comp = await html2dom`
    <div class="molecule_list">
    <div>${await this.atom(1)}</div>
    <div>${listItems(list)}</div>
    </div>`;
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
