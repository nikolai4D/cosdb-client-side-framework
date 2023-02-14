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
  const functionsDiv = document.createElement("div");
  functionsDiv.classList.add("functions");

  for (const func of functions) {
    for (const [key, value] of Object.entries(func)) {
      if (key !== "functionId") {
        const id = func.functionId;
        const funcBody = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = key + ": ";
        const select = dropdown(funcs, value, id);
        funcBody.appendChild(label);
        funcBody.appendChild(select);
        functionsDiv.appendChild(funcBody);
      }
    }
  }

  return functionsDiv;
}
