import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";

export async function Components(parentId) {
  const slotType = "slot";
  const componentType = "component";
  //get slots
  const Slots = await apiCallGet(`/read/${slotType}s/${parentId}`);
  console.log(Slots);

  const componentsArray = [];

  for (const slot of Slots) {
    try {
      const comp = await apiCallGet(`/read/${componentType}s/${slot.id}`);

      if (comp.length > 0) {
        const compObj = {
          id: comp[0].id,
          slot: slot.value,
          content: comp[0].value,
        };

        componentsArray.push(compObj);
      }
    } catch (error) {
      console.log("no component found for slot ", slot.value);
    }
  }

  return componentsArray;
}
