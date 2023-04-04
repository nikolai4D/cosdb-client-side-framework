import { Atom_ListItem2 } from "../atoms/Atom_ListItem2.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { html2dom } from "../../core/helpers/html2dom.mjs";
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";

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

  const compData2 = [
    { title: "title1" },
    { title: "title2" },
    { title: "title3" },
  ];

  const compDatas = async (compData2) =>
    await Promise.all(
      compData.map(async (item) => {
        return await this.atom(2, item.title);
      })
    );

  const component = async (compData = "compData placeholder") => {
    const comp = await createElement(
      "div",
      { className: "Molecule_ListWHeading2" },
      await createElement("div", {}, await this.atom(1, compData)),
      await createElement("ul", {}, ...(await compDatas(compData2)))
    );

    //add event listener to the comp here

    return comp;
  };

  this.render = async (data = "data placeholder") => {
    return await component(data);
  };
}
