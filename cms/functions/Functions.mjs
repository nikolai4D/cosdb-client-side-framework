import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";

const funcs = [
  "function1",
  "function2",
  "function3",
  "function4",
  "function5",
  "function6",
  "function7",
  "function8",
  "function9",
  "function10",
];

export function Functions(functions) {
  let functionsHtml = "";

  for (const func of functions) {
    console.log(func, "func");
    const body = `function: ${dropdown(funcs, func.function)}<br>`;
    functionsHtml += `${body} <br>`;
  }

  return `   
    <div class="functions">
      ${functionsHtml}
    </div>
  `;
}
