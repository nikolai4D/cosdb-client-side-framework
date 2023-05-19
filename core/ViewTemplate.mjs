export function ViewTemplate() {
  this.title = "ViewTemplate";

  this.slot = function (slotname) {
    const slot = this.slots.find((s) => s.slot === slotname);
    return slot ? slot.content : null;
  };
}
