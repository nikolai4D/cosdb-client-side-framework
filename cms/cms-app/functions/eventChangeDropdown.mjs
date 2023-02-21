import { updateViewTemplateData } from "../_3_update/updateViewTemplateData.mjs";
import { updateViewTemplateDom } from "../_3_update/updateViewTemplateDom.mjs";
import { updateComponentData } from "../_3_update/updateComponentData.mjs";
import { updateComponentDom } from "../_3_update/updateComponentDom.mjs";
import { updateFunctionData } from "../_3_update/updateFunctionData.mjs";

export async function eventChangeDropdown(id, key) {
  const select = document.getElementById(id);
  const selectedValue = select.value;
  const { keytype } = select.dataset;

  if (keytype === "viewTemplate") {
    // update viewTemplateData

    const updatedViewTemplateData = await updateViewTemplateData(
      id,
      selectedValue
    );

    //update viewTemplateDom
    return await updateViewTemplateDom(updatedViewTemplateData);
  }
  else if(keytype === "function") {
    updateFunctionData()
  }
  else if (keytype === "slot" || keytype === "molecule" || keytype === "atom") {

    const updatedComponentData = await updateComponentData(
      id,
      selectedValue
    );

    return await updateComponentDom(updatedComponentData);

  }
}
