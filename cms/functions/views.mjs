import { readModel } from "./requests/readModel.mjs";
import { createNew } from "./createNew.mjs";
import { existingViews } from "./existingViews.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  console.log("views: ", views);
}
