import { createViewData } from "./createViewData.mjs";
import { createViewDom } from "./createViewDom.mjs";

export async function createView() {
  //create ViewData
  const viewData = await createViewData();

  return await createViewDom(viewData);

  //create ViewDiv
}
