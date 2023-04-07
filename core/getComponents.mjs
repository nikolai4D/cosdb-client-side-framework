import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getComponent } from "./getComponent.mjs";

export async function getComponents(parentId) {
  const slotType = "slot";
  const componentType = "component";
  //get slots
  const Slots = await apiCallGet(`/read/${slotType}s/${parentId}`);
  console.log(Slots, "slots found for parent ");

  const componentsArray = [];

  for (const slot of Slots) {
    console.log(slot, "slot");
    try {
      const comp = await apiCallGet(`/read/${componentType}s/${slot.id}`);
      console.log(comp, "component found for slot ");
      if (comp.length > 0) {
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
    } catch (error) {
      console.log("no component found for slot ", slot.value);
    }
  }

  return componentsArray;
}
