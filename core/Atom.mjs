import { AtomicComponent } from "./AtomicComponent.mjs";
export function AtomicComponent() {
  AtomicComponent.call(this);

  this.atom = () => {
    return this.value[0].value;
  };
}
