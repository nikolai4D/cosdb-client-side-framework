import { html2dom } from "../../core/helpers.mjs";

export function ViewTemplate_dummy2() {
  this.slots = [
    {
      slot: "slot3",
      content: "slot3 content",
    },
    {
      slot: "slot4",
      content: "slot4 content",
    },
  ];

  const comp = async () => {
    return await html2dom`
        <div><h1>${this.slots[0].content}</h1></div>
        <div><h3>${this.slots[1].content}</h3></div>
        <div><h5>${this.slots[1].content}</h5></div>
        <div><h5>TEXT</h5></div>`;
  };

  this.render = async () => {
    const dom = await comp();
    return dom;
  };
}

//  <div>${this.slots[0].slot}</div>
// <div>${this.slots[1].slot}</div>
