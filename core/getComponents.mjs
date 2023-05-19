import { getComponent } from "./getComponent.mjs";
import { State } from "../data-mgmt/State.mjs";

export async function getComponents(parentId) {
  const slotType = "slot";
  const componentType = "component";

  //get slots
  const Slots = State.components.slots.filter((s) => s.parentId === parentId);
  const componentsArray = [];

  if (Slots.length > 0) {
    for (const slot of Slots) {
      let comp = null;
      try {
        comp = State.components.components.filter(
          (c) => c.parentId === slot.id
        );
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
