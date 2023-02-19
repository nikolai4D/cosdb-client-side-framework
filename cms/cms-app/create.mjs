import { createView } from "./create/createView.mjs";

export function create() {
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    // const id = await getUuid();
    // const view = { id: id, view: "New View", viewTemplate: {}, slots: [] };
    // const viewDiv = await ViewDiv(view);

    document.body.insertBefore(await createView(), document.body.children[1]);
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
}
