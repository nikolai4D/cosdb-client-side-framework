import { readFunctions } from "../requests/readFunctions.mjs";

export async function functionValues() {
  let components = (await readFunctions()).map((component) => component.name);
  components = ["", ...components];

  return components;
}
