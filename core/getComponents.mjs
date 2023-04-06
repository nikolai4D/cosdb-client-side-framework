import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getComponent } from "./getComponent.mjs";

export async function getComponents(parentId) {
  const slotType = "slot";
  const componentType = "component";
  //get slots
  const Slots = await apiCallGet(`/read/${slotType}s/${parentId}`);

  const componentsArray = [];

  for (const slot of Slots) {
    try {
      const comp = await apiCallGet(`/read/${componentType}s/${slot.id}`);
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
      console.log(error, "no component found for slot ", slot.value);
    }
  }

  return componentsArray;
}
