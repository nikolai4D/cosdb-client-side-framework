import { createViewAndViewTemplate } from "./createViewAndViewTemplate.mjs";

export function create() {
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    const createViewAndViewTemplate = await createViewAndViewTemplate();
    document.body.insertBefore(
      createViewAndViewTemplate,
      document.body.children[1]
    );
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
}
