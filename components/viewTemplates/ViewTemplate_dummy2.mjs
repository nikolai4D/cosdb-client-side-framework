import { html2dom } from "../../core/helpers.mjs";

export function ViewTemplate_dummy2(setSlots = null) {
  this.slots = [
    {
      slot: "slot3",
    },
    {
      slot: "slot4",
    },
  ];
  if (setSlots) {
    this.slots = setSlots;
  }

  const slt = (slotName) => {
    const foundSlot = this.slots.find((s) => s.slot === slotName);
    return foundSlot ? foundSlot.content : "";
  };

  return async () => {
    await html2dom`
      <div>${slt("slot3")}</div>
      <div>${slt("slot4")}</div>
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
