import { createComponent } from "./helpers/createComponent.mjs";
import { getComponents } from "./getComponents.mjs";
import { createElement } from "./helpers/createElement.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function getViewTemplate(parentId) {
  const type = "viewTemplate";

  const viewTemplate = State.components.viewTemplates.filter(
    (vt) => vt.parentId === parentId
  );
  const id = viewTemplate[0].id;
  const value = viewTemplate[0].value;

  // get the viewTemplate

  const components = await getComponents(id);
  const viewTemplateObject = await createComponent(type, value);
  viewTemplateObject.slots = components;
  const renderViewTemplate = await viewTemplateObject.render();

  // Create a new div from type
  const viewTemplateDiv = await await createElement(
    "div",
    { className: type, id: id },
    renderViewTemplate
  );

  return viewTemplateDiv;
}
