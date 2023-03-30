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

  const listItems = async (list) => {
    let items = [];
    for (let item of list) {
      console.log(await this.atom(2));
      items.push(await this.atom(2));
    }

    // const items = await Promise.all(
    //   list.map(async () => {
    //     console.log(await this.atom(2));
    //     return await this.atom(2);
    //   })
    // );
    return items;
  };

  //   const listItems = async (list) => {
  //     const items = await Promise.all(
  //       list.map(async (item) => {
  //         return await this.atom(2).toString(item);
  //       })
  //     );
  //     return items.join(" ");
  //   };

  const component = async () => {
    console.log(await listItems(list));

    const comp = await html2dom`
    <div class="molecule_list">
    <div>${await this.atom(1)}</div>
    <ul>${(await listItems(list))[1]}
        </ul>
    </div>`;
    return comp;
  };

  this.render = async () => {
    return await component();
  };
}
