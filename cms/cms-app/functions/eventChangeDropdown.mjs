import { updateViewTemplateData } from "../_3_update/updateViewTemplateData.mjs";
import { updateViewTemplateDom } from "../_3_update/updateViewTemplateDom.mjs";

export async function eventChangeDropdown(id, key) {
  const select = document.getElementById(id);
  const selectedValue = select.value;

  if (key === "viewTemplate") {
    // update viewTemplateData

    const updatedViewTemplateData = await updateViewTemplateData(
      id,
      selectedValue
    );

    //update viewTemplateDom

    console.log(updatedViewTemplateData, "updatedViewTemplateData");

    // const updatedViewTemplateDom = await updateViewTemplateDom(
    //   updatedViewTemplateData
    // );
  } else {
    console.log("else");
  }
}
