import { AtomicComponent } from "./AtomicComponent.mjs";
export function Atom() {
  AtomicComponent.call(this);
  this.component = "atom";

  this.value = [{ value: "placeholder" }];

  this.atom = () => {
    return this.value[0].value;
  };
}
