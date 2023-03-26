import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getComponent } from "./getComponent.mjs";

export async function getComponents(parentId) {
  const slotType = "slot";
  const componentType = "component";
  //get slots
  const Slots = await apiCallGet(`/read/${slotType}s/${parentId}`);
  console.log(Slots);

  const componentsArray = [];

  for (const slot of Slots) {
    try {
      const comp = await apiCallGet(`/read/${componentType}s/${slot.id}`);
      //comp[0].value is the component name to be read from /components
      if (comp.length > 0) {
        const componentFromModule = await getComponent(
          comp[0].value,
          comp[0].id
        );

        const compObj = {
          id: comp[0].id,
          slot: slot.value,
          //content: comp[0].value,
          content: await componentFromModule,
        };

        componentsArray.push(compObj);
      }
    } catch (error) {
      console.log(error, "no component found for slot ", slot.value);
    }
  }

  return componentsArray;
}
