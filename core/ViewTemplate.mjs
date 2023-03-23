import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function ViewTemplate(parentId) {
  const type = "viewTemplate";
  //validate and authenticate path
  const viewTemplate = await apiCallGet(`/read/${type}s/${parentId}`);
  console.log({ viewTemplate });
  const id = viewTemplate.id;
  const value = viewTemplate.value;

  // Create a new div from type
  const div = document.createElement("div");
  div.classList.add(type);
  div.setAttribute("id", id);
  div.innerHTML = value;

  // Append the view to the body
  document.body.appendChild(div);
}
