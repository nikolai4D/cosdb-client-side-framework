export function ViewTemplate() {
  this.title = "ViewTemplate";

  //   this.slot = (slotName) => {
  //     this.slots.find((slot) => slot.slot === slotName)?.content || "";
  this.slot = async function (slotname) {
    const component = Array.from(
      this.slots.find((slot) => slot.slot === slotname)?.content
    );
    return component.map((elem) => elem.outerHTML).join("");
  };
}
