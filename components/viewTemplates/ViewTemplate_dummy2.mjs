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

  const comp = async () => {
    console.log(this.slots[0].slot, "this.slots[0].slot");
    console.log(this.slots[1].slot, "this.slots[1].slot");
    return await html2dom`
        <div><h1>${this.slots[0].slot}</h1></div>
        <div><h3>${this.slots[1].slot}</h3></div>
        <div><h5>TEXT</h5></div>`;
  };

  this.render = async () => {
    const dom = await comp();
    return dom;
  };
}

//  <div>${this.slots[0].slot}</div>
// <div>${this.slots[1].slot}</div>
