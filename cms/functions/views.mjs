import { readModel } from "./requests/readModel.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  console.log("views: ", views);
}
