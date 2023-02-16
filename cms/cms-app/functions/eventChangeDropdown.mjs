import { readModel } from "../requests/readModel.mjs";
import { updateField } from "../functions/updateField.mjs";
import { writeModel } from "../requests/writeModel.mjs";
import { updateViewTemplate } from "../functions/updateViewTemplate.mjs";

export async function eventChangeDropdown(id, key) {
  const model = await readModel();
  //   console.log(model);
  const select = document.getElementById(id);
  const selectedValue = select.value;

  if (key === "viewTemplate") {
    const updatedModel = await updateViewTemplate(model, id, selectedValue);

    await writeUpdatedModel(updatedModel, key, id, selectedValue);
    // await writeModel(updatedModel);
    // console.log("changed " + key + ": " + id + "with value: " + selectedValue);

    // const accordionBodyId = "accordion-body-" + id;
    // const accordionBody = document.getElementById(accordionBodyId);
    // if (accordionBody) {
    //   while (accordionBody.firstChild) {
    //     accordionBody.removeChild(accordionBody.firstChild);
    //   }
    //   console.log("accordion-body-" + id + " deleted");
    // }

    deleteViewTemplateAccordionBody(id);
  } else {
    const updatedModel = await updateField(model, id, selectedValue);
    await writeUpdatedModel(updatedModel, key, id, selectedValue);
    // await writeModel(updatedModel);
    // console.log("changed " + key + ": " + id + "with value: " + selectedValue);
  }
}

async function writeUpdatedModel(updatedModel, key, id, selectedValue) {
  await writeModel(updatedModel);
  console.log("changed " + key + ": " + id + "with value: " + selectedValue);
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
