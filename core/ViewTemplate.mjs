export function ViewTemplate() {
  this.title = "ViewTemplate";

  this.slot = function (slotname) {
    const component = this.slots.find(
      (slot) => slot.slot === slotname
    )?.content;
    return component;
  };
}
