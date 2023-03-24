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
    return await html2dom`
      <div>${this.slots[0].slot}</div>
      <div>${this.slots[1].slot}</div>
      <div>TEXT</div>
    `;
  };

  this.render = async () => {
    const dom = await comp();
    return dom;
  };
}
