import { createViewTemplateData } from "./createViewTemplateData.mjs";
import { createViewTemplateDom } from "./createViewTemplateDom.mjs";

export async function createViewTemplate(viewId) {
  //create viewTemplateData

  const viewTemplateData = await createViewTemplateData(viewId);

  //create viewTemplateDom

  return await createViewTemplateDom(viewTemplateData);
}
