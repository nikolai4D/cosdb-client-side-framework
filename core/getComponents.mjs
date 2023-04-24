import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { getComponent } from "./getComponent.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function getComponents(parentId) {
  const slotType = "slot";
  const componentType = "component";
  //get slots
  //const Slots = await apiCallGet(`/read/${slotType}s/${parentId}`);
  const Slots = State.components.slots.filter((s) => s.parentId === parentId);
  const componentsArray = [];
  console.log("Slots", Slots);

  if (Slots.length > 0) {
    for (const slot of Slots) {
      let comp = null;
      try {
        //comp = await apiCallGet(`/read/${componentType}s/${slot.id}`);
        console.log("State.components.components", State.components.components);
        comp = State.components.components.filter(
          (c) => c.parentId === slot.id
        );
        console.log("comp", comp);
      } catch (error) {
        console.log("no component found for slot ", slot.value);
      }

      if (comp) {
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
