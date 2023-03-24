import { html2dom } from "../../core/helpers.mjs";

export function ViewTemplate_dummy2() {
  this.slots = [
    {
      slot: "slot3",
    },
    {
      slot: "slot4",
    },
  ];

  return async () => {
    await html2dom`
      <div>${this.slots[0].slot}</div>
      <div>${this.slots[1].slot}</div>
      <div>TEXT</div>
    `;
  };
}

// import { html2dom } from "../../core/helpers.mjs";

// export async function ViewTemplate_dummy2() {
//   this.slots = [
//     {
//       slot: "slot3",
//     },
//     {
//       slot: "slot4",
//     },
//   ];

//   const slot = (slotName) => {
//     const foundSlot = this.slots.find((s) => s.slot === slotName);
//     return foundSlot ? foundSlot.content : "";
//   };

//   return await html2dom`
//   <div>${slot("slot3")}</div>
//   <div>${slot("slot4")}</div>
// `;
// }
