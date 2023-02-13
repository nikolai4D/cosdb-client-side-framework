import { readModel } from "./requests/readModel.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  console.log("views: ", views);

  for (const view of views) {
    const { name, id } = view;
    const viewDiv = document.createElement("div");
    viewDiv.id = id;
    viewDiv.className = "view";
    viewDiv.innerHTML = `<h2>${name}</h2>`;
    document.body.appendChild(viewDiv);
  }
}
