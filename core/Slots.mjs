import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function Slots(parentId) {
  const type = "slot";
  //validate and authenticate path
  const Slots = await apiCallGet(`/read/${type}s/${parentId}`);
  console.log(Slots);

  const SlotsArray = [];

  for (const slot of Slots) {
    const id = slot.id;
    const value = slot.value;
    SlotsArray.push({ id: id, slot: value, content: value + " content" });
  }

  return SlotsArray;
}
