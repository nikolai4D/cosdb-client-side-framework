import { readModel } from "../requests/readModel.mjs";
import { updateField } from "../functions/updateField.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { updateViewTemplate } from "../functions/updateViewTemplate.mjs";

export async function eventChangeDropdown(id, key) {
  const model = await readModel();
  const select = document.getElementById(id);
  const selectedValue = select.value;

  if (key === "viewTemplate") {
    // update viewTemplateData
    //update viewTemplateDom

    const updatedModel = await updateViewTemplate(model, id, selectedValue);

    await writeModel(updatedModel);
    console.log("changed " + key + ": " + id + "with value: " + selectedValue);

    //await deleteViewTemplateAccordionBody(id);

    // get slots from viewTemplate and add to viewTemplateDom
  } else {
    const updatedModel = await updateField(model, id, selectedValue);
    await writeModel(updatedModel);
    console.log("changed " + key + ": " + id + "with value: " + selectedValue);
  }
}

function deleteViewTemplateAccordionBody(id) {
  const accordionBodyId = "accordion-body-" + id;
  const accordionBody = document.getElementById(accordionBodyId);
  if (accordionBody) {
    while (accordionBody.firstChild) {
      accordionBody.removeChild(accordionBody.firstChild);
    }
    console.log("accordion-body-" + id + " deleted");
  }
}
