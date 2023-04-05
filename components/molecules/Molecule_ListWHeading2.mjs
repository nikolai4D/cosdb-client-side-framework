import { Atom_ListItem2 } from "../atoms/Atom_ListItem2.mjs";
import { Atom_Heading4 } from "../atoms/Atom_Heading4.mjs";
import { Molecule } from "../../core/Molecule.mjs";
import { createElement } from "../../core/helpers/createElement.mjs";

export function Molecule_ListWHeading2() {
  Molecule.call(this);

  // sub components
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

  //build component

  const component = async (
    compData = [{ title: "title1" }, { title: "title2" }]
  ) => {
    const ulCompInput = await compDatas(compData);
    console.log(compData, "compData!!!!!!!!!!!!");
    console.log(ulCompInput, "ulCompInput!!!!!!!!!!!!");
    const comp = await createElement(
      "div",
      { className: "Molecule_ListWHeading2" },
      await createElement("div", {}, await this.atom(1, null)),
      await createElement("ul", {}, ...ulCompInput)
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (data) => {
    return await component(data);
  };

  //add component specific functions here

  const compDatas = async (arrayOfData) => {
    console.log(arrayOfData, "arrayOfData!!!!!!!!!!!!");
    await Promise.all(
      arrayOfData.map(async (item) => {
        return await this.atom(2, item.title);
      })
    );
  };
}
