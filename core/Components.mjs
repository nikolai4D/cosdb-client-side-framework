import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function Components(parentId) {
  const slotType = "slot";
  const componentType = "component";
  //get slots
  const Slots = await apiCallGet(`/read/${slotType}s/${parentId}`);
  console.log(Slots);

  const componentsArray = [];

  for (const slot of Slots) {
    const comp = await apiCallGet(`/read/${componentType}s/${slot.id}`);
    if (comp) {
      componentsArray.push({
        id: comp.id,
        slot: slot.value,
        content: comp.value,
      });
    }
  }

  return componentsArray;
}
