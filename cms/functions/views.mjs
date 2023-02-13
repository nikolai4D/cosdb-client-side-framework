import { readModel } from "./requests/readModel.mjs";

export async function views() {
  const data = await readModel();

  const views = data.views;

  console.log("views: ", views);

  for (const v of views) {
    const { view, id } = v;
    const viewDiv = document.createElement("div");
    viewDiv.id = id;
    viewDiv.className = "view";
    viewDiv.innerHTML = `<h2>${view}</h2>`;
    document.body.appendChild(viewDiv);
  }
}
