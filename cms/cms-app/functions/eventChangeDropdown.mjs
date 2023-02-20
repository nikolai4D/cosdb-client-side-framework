import { updateViewTemplateData } from "../_3_update/updateViewTemplateData.mjs";

export async function eventChangeDropdown(id, key) {
  const select = document.getElementById(id);
  const selectedValue = select.value;

  if (key === "viewTemplate") {
    // update viewTemplateData

    const updatedViewTemplateData = await updateViewTemplateData(
      id,
      selectedValue
    );

    console.log(updatedViewTemplateData, "updatedViewTemplateData");

    //update viewTemplateDom

    console.log("changed " + key + ": " + id + "with value: " + selectedValue);
  } else {
    // const updatedModel = await updateField(model, id, selectedValue);
    // await writeModel(updatedModel);
    // console.log("changed " + key + ": " + id + "with value: " + selectedValue);
  }
}

// function updateViewTemplateAccordionBody(id) {
//   const accordionBodyId = "accordion-body-" + id;
//   const accordionBody = document.getElementById(accordionBodyId);
//   if (accordionBody) {
//     while (accordionBody.firstChild) {
//       accordionBody.removeChild(accordionBody.firstChild);
//     }
//     console.log("accordion-body-" + id + " deleted");
//   }
// }
