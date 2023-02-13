import { readModel } from "./readModel.mjs";
import { createNew } from "./createNew.mjs";
import { existingViews } from "./existingViews.mjs";

export async function appendViews() {
  const data = await readModel();

  const views = data.views;

  const keys = Object.keys(views);

  const body = document.querySelector("body");

  const createNewContainer = document.createElement("div");
  body.appendChild(createNewContainer);

  const existingViewsContainer = document.createElement("div");
  body.appendChild(existingViewsContainer);

  createNew(existingViewsContainer, createNewContainer, keys);
  existingViews(existingViewsContainer, views);
}
