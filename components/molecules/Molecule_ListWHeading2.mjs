import { Atom_ListItem2 } from "../atoms/Atom_ListItem2.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { Molecule } from "../../core/Molecule.mjs";

export function Molecule_ListWHeading2(data = {}) {
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

  const component = async () => {
    const comp = await html2dom`
    <div class="molecule_list">
    <div>${await listItems(list)}</div>
    <div></div>
    </div>`;
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}

const list = [
  { title: "list item 1" },
  { title: "list item 2" },
  { title: "list item 3" },
];

const listItems = async (list) => {
  for (const item of list) {
    await this.atom(2);
  }
};
