export function AtomicComponent() {
  this.render = async () => {
    return await component();
  };
}
