import { newView } from "../_1_view/newView.mjs";
import { View } from "../_1_view/View.mjs";
import { newViewTemplate } from "../_2_viewTemplate/newViewTemplate.mjs";
import { ViewTemplate } from "../_2_viewTemplate/ViewTemplate.mjs";

export async function createViewButton() {
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    const newViewCreated = await newView();
    const newViewTemplateCreated = await newViewTemplate(newViewCreated.id);
    const ViewTemplateCreated = await ViewTemplate(newViewTemplateCreated);
    document.body.insertBefore(
      await View(newViewCreated, ViewTemplateCreated),
      document.body.children[1]
    );
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
}
