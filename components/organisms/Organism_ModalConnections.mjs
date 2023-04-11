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
      purpose: "set state to be used as list items",
      function: () => console.log("placeholder function"),
    },
  ];

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
          await this.molecule(3, compData.internalRelsToNode)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectionbottomleft" },
          await this.molecule(4, compData.externalRelsToNode)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__content" },
          await this.molecule(2, compData)
        ),
        await createElement(
          "div",
          { class: "organism_modalconnections__content__connectiontopright" },
          await this.molecule(5, compData.internalRelsFromNode)
        ),
        await createElement(
          "div",
          {
            class: "organism_modalconnections__content__connectionbottomright",
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
        node: { title: "node title placeholder", id: "node id placeholder" },
        parentNode: {
          title: "parent node title placeholder",
          id: "parent node id placeholder",
        },
        externalRelsToNode: [
          {
            rel: {
              title: "externalRelsToNode rel title placeholder",
              id: "externalRelsToNode rel id placeholder",
            },
            node: {
              title: "externalRelsToNode node title placeholder",
              id: "externalRelsToNode node id placeholder",
            },
            parentNode: {
              title: "externalRelsToNode parentNode title placeholder",
              id: "externalRelsToNode parentNode id placeholder",
            },
          },
        ],
        externalRelsFromNode: [
          {
            rel: {
              title: "externalRelsFromNode rel title placeholder",
              id: "externalRelsFromNode rel id placeholder",
            },
            node: {
              title: "externalRelsFromNode node title placeholder",
              id: "externalRelsFromNode node id placeholder",
            },
            parentNode: {
              title: "externalRelsFromNode parentNode title placeholder",
              id: "externalRelsFromNode parentNode id placeholder",
            },
          },
        ],
        internalRelsToNode: [
          {
            rel: {
              title: "internalRelsToNode rel title placeholder",
              id: "internalRelsToNode rel id placeholder",
            },
            node: {
              title: "internalRelsToNode node title placeholder",
              id: "internalRelsToNode node id placeholder",
            },
            parentNode: {
              title: "internalRelsToNode parentNode title placeholder",
              id: "internalRelsToNode parentNode id placeholder",
            },
          },
        ],
        internalRelsFromNode: [
          {
            rel: {
              title: "internalRelsFromNode rel title placeholder",
              id: "internalRelsFromNode rel id placeholder",
            },
            node: {
              title: "internalRelsFromNode node title placeholder",
              id: "internalRelsFromNode node id placeholder",
            },
            parentNode: {
              title: "internalRelsFromNode parentNode title placeholder",
              id: "internalRelsFromNode parentNode id placeholder",
            },
          },
        ],
      };
    }
    console.log("data", data);

    return await component(data);
  };

  //add component specific functions here
}

// //import core
// import { createElement } from "../../core/helpers/createElement.mjs";
// import { Organism } from "../../core/Organism.mjs";
// //import sub components
// import { Molecule_ModalHeader } from "../molecules/Molecule_ModalHeader.mjs";
// import { Molecule_ModalConnection } from "../molecules/Molecule_ModalConnection.mjs";
// import { Molecule_ModalCenterContent } from "../molecules/Molecule_ModalCenterContent.mjs";

// export function Organism_ModalConnections() {
//   Organism.call(this);

//   // sub components
//   this.organisms = [];

//   this.molecules = [
//     {
//       id: 1,
//       molecule: "Molecule_ModalHeader",
//       component: new Molecule_ModalHeader(),
//     },
//     {
//       id: 2,
//       molecule: "Molecule_ModalConnection",
//       component: new Molecule_ModalConnection(),
//     },
//     {
//       id: 3,
//       molecule: "Molecule_ModalCenterContent",
//       component: new Molecule_ModalCenterContent(),
//     },
//   ];

//   this.functions = [
//     {
//       id: 1,
//       purpose: "set state to be used as list items",
//       function: () => console.log("placeholder function"),
//     },
//   ];

//   //build component
//   const component = async (compData) => {
//     const comp = await createElement(
//       "div",
//       { class: "organism_modalconnections" },
//       await createElement(
//         "div",
//         { class: "organism_modalconnections__header" },
//         await this.molecule(1, null)
//       ),
//       await createElement(
//         "div",
//         { class: "organism_modalconnections__content" },
//         await createElement(
//           "div",
//           { class: "organism_modalconnections__content__connectiontopleft" },
//           await this.molecule(2, compData.internalRelsToNode)
//         ),
//         await createElement(
//           "div",
//           { class: "organism_modalconnections__content__connectionbottomleft" },
//           await this.molecule(2, compData.externalRelsToNode)
//         ),
//         await createElement(
//           "div",
//           { class: "organism_modalconnections__content__content" },
//           await this.molecule(3, compData)
//         ),
//         await createElement(
//           "div",
//           { class: "organism_modalconnections__content__connectiontopright" },
//           await this.molecule(2, compData.internalRelsFromNode)
//         ),
//         await createElement(
//           "div",
//           {
//             class: "organism_modalconnections__content__connectionbottomright",
//           },
//           await this.molecule(2, compData.externalRelsFromNode)
//         )
//       )
//     );

//     //add event listener to the comp here

//     return comp;
//   };

//   //render component
//   this.render = async (indata) => {
//     let data;
//     if (indata) {
//       data = await this.fn(1, indata);
//     } else {
//       data = {
//         node: { title: "node title placeholder" },
//         parentNode: { title: "parent node title placeholder" },
//         externalRelsToNode: [
//           {
//             rel: { title: "externalRelsToNode rel title placeholder" },
//             node: { title: "externalRelsToNode node title placeholder" },
//             parentNode: {
//               title: "externalRelsToNode parentNode title placeholder",
//             },
//           },
//         ],
//         externalRelsFromNode: [
//           {
//             rel: { title: "externalRelsFromNode rel title placeholder" },
//             node: { title: "externalRelsFromNode node title placeholder" },
//             parentNode: {
//               title: "externalRelsFromNode parentNode title placeholder",
//             },
//           },
//         ],
//         internalRelsToNode: [
//           {
//             rel: { title: "internalRelsToNode rel title placeholder" },
//             node: { title: "internalRelsToNode node title placeholder" },
//             parentNode: {
//               title: "internalRelsToNode parentNode title placeholder",
//             },
//           },
//         ],
//         internalRelsFromNode: [
//           {
//             rel: { title: "internalRelsFromNode rel title placeholder" },
//             node: { title: "internalRelsFromNode node title placeholder" },
//             parentNode: {
//               title: "internalRelsFromNode parentNode title placeholder",
//             },
//           },
//         ],
//       };
//     }
//     console.log("data", data);

//     return await component(data);
//   };

//   //add component specific functions here
// }
