import { dropdown } from "./types/dropdown.mjs";

const functions = [
  "function1",
  "function2",
  "function3",
  "function4",
  "function5",
];

export function Functions(functions) {
  let functionsHtml = "";

  for (const func of functions) {
    const body = `function: ${dropdown(functions, func.function)}<br>`;
    functionsHtml += `${body} <br>`;
  }

  return `   
    <div class="functions">
      ${functionsHtml}
    </div>
  `;
}
