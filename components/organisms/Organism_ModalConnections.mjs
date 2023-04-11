//import core
import { createElement } from "../../core/helpers/createElement.mjs";
import { Organism } from "../../core/Organism.mjs";
//import sub components
import { Molecule_ModalHeader } from "../molecules/Molecule_ModalHeader.mjs";
import { Molecule_ModalConnection } from "../molecules/Molecule_ModalConnection.mjs";
import { Molecule_ModalCenterContent } from "../molecules/Molecule_ModalCenterContent.mjs";

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
      molecule: "Molecule_ModalConnection",
      component: new Molecule_ModalConnection(),
    },
    {
      id: 3,
      molecule: "Molecule_ModalCenterContent",
      component: new Molecule_ModalCenterContent(),
    },
  ];

  this.functions = [];

  //build component
  const component = async (compData) => {
    const comp = await createElement(
      "div",
      { class: "organism_modalconnections" },
      await createElement(
        "div",
        { class: "organism_modalconnections__header" },
        await this.molecule(1, null)
      ),
      await createElement(
        "div",
        { class: "organism_modalconnections__content" },
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectiontopleft" },
          await this.molecule(2, compData.internalRelsToNode)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectionbottomleft" },
          await this.molecule(2, compData.externalRelsToNode)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__content" },
          await this.molecule(3, compData)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectiontopright" },
          await this.molecule(2, compData.internalRelsFromNode)
        ),
        await createElement(
          "div",
          {
            class: "organism_modalconnections__content__connectionbottomright",
          },
          await this.molecule(2, compData.externalRelsFromNode)
        )
      )
    );

    //add event listener to the comp here

    return comp;
  };

  //render component
  this.render = async (
    data = {
      node: { title: "node title placeholder" },
      parentNode: { title: "parent node title placeholder" },
      externalRelsToNode: [
        {
          rel: { title: "externalRelsToNode rel title placeholder" },
          node: { title: "externalRelsToNode node title placeholder" },
          parentNode: {
            title: "externalRelsToNode parentNode title placeholder",
          },
        },
      ],
      externalRelsFromNode: [
        {
          rel: { title: "externalRelsFromNode rel title placeholder" },
          node: { title: "externalRelsFromNode node title placeholder" },
          parentNode: {
            title: "externalRelsFromNode parentNode title placeholder",
          },
        },
      ],
      internalRelsToNode: [
        {
          rel: { title: "internalRelsToNode rel title placeholder" },
          node: { title: "internalRelsToNode node title placeholder" },
          parentNode: {
            title: "internalRelsToNode parentNode title placeholder",
          },
        },
      ],
      internalRelsFromNode: [
        {
          rel: { title: "internalRelsFromNode rel title placeholder" },
          node: { title: "internalRelsFromNode node title placeholder" },
          parentNode: {
            title: "internalRelsFromNode parentNode title placeholder",
          },
        },
      ],
    }
  ) => {
    return await component(data);
  };

  //add component specific functions here
}
