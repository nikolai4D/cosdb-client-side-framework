//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_ModalHeader } from "../molecules/Molecule_ModalHeader.mjs";
import { Molecule_ModalConnection } from "../molecules/Molecule_ModalConnection.mjs";
import { Molecule_ModalCenterContent } from "../molecules/Molecule_ModalCenterContent.mjs";
import { action_getRelatedNodes } from "../../data-mgmt/actions/action_getRelatedNodes.mjs";

export function Organism_ModalConnections() {
  Organism.call(this);

  // sub components
  this.organisms = [];

  this.molecules = [
    {
      id: 1,
      molecule: "Molecule_ModalHeader",
      component: new Molecule_ModalHeader(),
    },
    {
      id: 2,
      molecule: "Molecule_ModalCenterContent",
      component: new Molecule_ModalCenterContent(),
    },
    {
      id: 3,
      molecule: "Molecule_ModalConnection", //internalRelsToNode
      component: new Molecule_ModalConnection(),
    },
    {
      id: 4,
      molecule: "Molecule_ModalConnection", //externalRelsToNode
      component: new Molecule_ModalConnection(),
    },
    {
      id: 5,
      molecule: "Molecule_ModalConnection", //internalRelsFromNode
      component: new Molecule_ModalConnection(),
    },
    {
      id: 6,
      molecule: "Molecule_ModalConnection", //externalRelsFromNode
      component: new Molecule_ModalConnection(),
    },
  ];

  this.functions = [
  { 
    id: 1,
    function: "action_getRelatedNodes",
    component: action_getRelatedNodes
  }
  ]

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "organism_modalconnections", id: compData.node.id},
      await createElement(
        "div",
        { class: "organism_modalconnections__header" , id: compData.node.id },
        await this.molecule(1, compData.node.id)
      ),
      await createElement(
        "div",
        { class: "organism_modalconnections__content", id: compData.node.id },
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectiontopleft", id: compData.node.id},
          await this.molecule(3, compData.internalRelsToNode)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectionbottomleft" , id: compData.node.id},
          await this.molecule(4, compData.externalRelsToNode)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__content", id: compData.node.id },
          await this.molecule(2, compData)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectiontopright", id: compData.node.id },
          await this.molecule(5, compData.internalRelsFromNode)
        ),
        await createElement(
          "div",
          {
            class: "organism_modalconnections__content__connectionbottomright" , id: compData.node.id
          },
          await this.molecule(6, compData.externalRelsFromNode)
        )
      )
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (indata) => {
    let data;
    if (indata) {
      data = await this.fn(1, indata);
    } else {
      data = {
        node: { title: "", id: "" },
        parentNode: {
          title: "",
          id: "",
        },
        externalRelsToNode: [],
        externalRelsFromNode: [],
        internalRelsToNode: [],
        internalRelsFromNode: [],
      };
    }
    console.log("data", data);

    return await component(data, indata);
  };

  //add component specific functions here
}

