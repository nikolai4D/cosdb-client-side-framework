import { fetchModel } from "./fetchModel.mjs";
import { addButton } from "./addButton.mjs";
import { dataContent } from "./dataContent.mjs";

export async function handleLoad() {
  const data = await fetchModel();

  const keys = Object.keys(data);

  const body = document.querySelector("body");

  const buttonsContainer = document.createElement("div");
  body.appendChild(buttonsContainer);

  const contentContainer = document.createElement("div");
  body.appendChild(contentContainer);

  addButton(contentContainer, buttonsContainer, keys);
  dataContent(contentContainer, data);
}
