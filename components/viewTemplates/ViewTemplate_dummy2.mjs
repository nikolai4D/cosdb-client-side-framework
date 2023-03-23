import { Component } from "../../core/Component.mjs";
import { html2dom } from "../../core/helpers.mjs";

export async function ViewTemplate_dummy2() {
  //   Component.call(this);

  //   this.slots = [
  //     {
  //       slot: "slot3",
  //     },
  //     {
  //       slot: "slot4",
  //     },
  //   ];

  //   this.getHtml = function(){
  //   return `
  //     <div>
  //           <div>${this.slots[0].slot}</div>
  //           <div>${this.slots[1].slot}</div>
  //     </div>
  //   `;
  //   }
  // }

  const divDOM1 = document.createElement("div");
  const h1Element1 = document.createElement("h1");
  h1Element1.textContent = "1";
  divDOM1.appendChild(h1Element1);

  const divDOM2 = document.createElement("div");
  const h1Element2 = document.createElement("h1");
  h1Element2.textContent = "2";
  divDOM1.appendChild(h1Element2);

  return await html2dom`
<div>${divDOM1}</div>
<div>${divDOM2}</div>
<div>${divDOM1}</div>
<div>${divDOM2}</div>
<div>${divDOM1}</div>
<div>${divDOM2}</div>
`;
}
