import { createViewData } from "./createViewData.mjs";
import { createViewDom } from "./createViewDom.mjs";
import { createViewTemplateData } from "./createViewTemplateData.mjs";
import { createViewTemplateDom } from "./createViewTemplateDom.mjs";

export async function createViewAndViewTemplate() {
  //create ViewData
  const viewData = await createViewData();

  //create viewTemplateData

  const viewTemplateData = await createViewTemplateData(viewData.id);

  //create viewTemplateDom

  const body = await createViewTemplateDom(viewTemplateData);

  //create ViewDom
  return await createViewDom(viewData, body);
}
