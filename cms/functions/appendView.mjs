import { fetchModel } from "./fetchModel.mjs";
import { createNew } from "./createNew.mjs";
import { dataContent } from "./dataContent.mjs";

export async function appendView() {
  const data = await fetchModel();

  const keys = Object.keys(data);

  const body = document.querySelector("body");

  const createNewContainer = document.createElement("div");
  body.appendChild(createNewContainer);

  const contentContainer = document.createElement("div");
  body.appendChild(contentContainer);

  createNew(contentContainer, createNewContainer, keys);
  dataContent(contentContainer, data);
}
