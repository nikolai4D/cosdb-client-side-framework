import { createViewData } from "./createViewData.mjs";
import { createViewDom } from "./createViewDom.mjs";
import { createViewTemplateData } from "./createViewTemplateData.mjs";
import { createViewTemplateDom } from "./createViewTemplateDom.mjs";

export async function createView() {
  //create ViewData
  const viewData = await createViewData();

  //create ViewDom
  await createViewDom(viewData);

  //create viewTemplateData

  const viewTemplateData = await createViewTemplateData(viewData.id);

  //create viewTemplateDom

  return await createViewTemplateDom(viewTemplateData);
}
