import { readModel } from "./readModel.mjs";
import { createNew } from "./createNew.mjs";
import { existingContent } from "./existingContent.mjs";

export async function appendView() {
  const data = await readModel();

  const keys = Object.keys(data);

  const body = document.querySelector("body");

  const createNewContainer = document.createElement("div");
  body.appendChild(createNewContainer);

  const existingContentContainer = document.createElement("div");
  body.appendChild(existingContentContainer);

  createNew(existingContentContainer, createNewContainer, keys);
  existingContent(existingContentContainer, data);
}
