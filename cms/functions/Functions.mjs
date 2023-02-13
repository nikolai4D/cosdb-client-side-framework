import { accordian } from "./types/accordian.mjs";
import { dropdown } from "./types/dropdown.mjs";

const funcs = ["function1", "function2", "function3", "function4", "function5"];

export function Functions(functions) {
  let functionsHtml = "";

  for (const func of functions) {
    const body = `function: ${dropdown(funcs, func.function)}<br>`;
    functionsHtml += `${accordian("function", func.function, body, true)} <br>`;
  }

  return `   
    <div class="functions">
      ${functionsHtml}
    </div>
  `;
}
