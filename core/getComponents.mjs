import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getComponent } from "./getComponent.mjs";

export async function getComponents(parentId) {
  const slotType = "slot";
  const componentType = "component";
  //get slots
  const Slots = await apiCallGet(`/read/${slotType}s/${parentId}`);
  const componentsArray = [];
  console.log("Slots", Slots);

  if (Slots.length > 0) {
    for (const slot of Slots) {
      let comp = null;
      try {
        comp = await apiCallGet(`/read/${componentType}s/${slot.id}`);
      } catch (error) {
        console.log("no component found for slot ", slot.value);
      }

      if (comp.length > 0) {
        console.log(comp);
        const componentFromModule = await getComponent(
          comp[0].value,
          comp[0].id
        );

        const compObj = {
          id: comp[0].id,
          slot: slot.value,
          content: componentFromModule,
        };

        componentsArray.push(compObj);
      }
    }
  }

  return componentsArray;
}
