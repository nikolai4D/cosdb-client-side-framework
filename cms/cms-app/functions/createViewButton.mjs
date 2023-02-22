export function createViewButton() {
  const createViewButton = document.createElement("button");
  createViewButton.textContent = "Create View";
  createViewButton.classList.add("createViewButton");
  createViewButton.addEventListener("click", async () => {
    console.log("createViewButton clicked");
  });
  document.body.insertBefore(createViewButton, document.body.firstChild);
}
