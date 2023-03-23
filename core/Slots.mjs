import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function Slots(parentId) {
  const type = "slots";
  //validate and authenticate path
  const slots = await apiCallGet(`/read/${type}s/${parentId}`);
  console.log(slots);

  const id = viewTemplate[0].id;
  const value = viewTemplate[0].value;

  // Create a new div from type
  const div = document.createElement("div");
  div.classList.add(type);
  div.setAttribute("id", id);
  const h1Element = document.createElement("h1");
  h1Element.textContent = value;
  div.appendChild(h1Element);

  return div;
}
