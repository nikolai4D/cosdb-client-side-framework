export function AtomicComponent() {
  this.component = "atomicComponent";
  this.render = async () => {
    return await component();
  };
}
