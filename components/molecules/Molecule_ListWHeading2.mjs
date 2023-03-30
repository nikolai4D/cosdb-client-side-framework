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

  //   const list = [
  //     { title: "list item 1" },
  //     // { title: "list item 2" },
  //     // { title: "list item 3" },
  //   ];

  //   const listItems = async (list) => {
  //     let items = [];
  //     for (let item of list) {
  //       const tempId = this.atoms.length + 1;
  //       this.atoms.push({ id: tempId, component: await this.atom(2) });
  //       items.push(tempId);
  //     }

  //     const liElements = [];
  //     for (let tempId of items) {
  //       liElements.push(await this.atom(tempId));
  //     }
  //     console.log(liElements);
  //     console.log("this.atoms", this.atoms);

  //     return liElements;
  //   };
  const component = async () => {
    const comp = await html2dom`
    <div class="molecule_list">
    <div>${await this.atom(1)}</div>
    <ul>${await new this.atom(2)}</ul>
    </div>`;

    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
