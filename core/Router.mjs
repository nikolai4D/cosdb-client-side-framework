import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { View } from "./View.mjs";

export async function Router(viewPath) {
  //validate and authenticate path
  const newView = await apiCallGet(`/auth/${viewPath}`);
  console.log("newView", newView);
  const newPath = newView.value;

  //set browser history
  window.history.pushState({ viewPath: newPath }, "", newPath);

  //set view
  await View(newPath);
}

// Listen for back or forward navigation
window.addEventListener("popstate", async (event) => {
  if (event.state && event.state.viewPath) {
    const viewPath = event.state.viewPath;

    //validate and authenticate path
    const newView = await apiCallGet(`/auth/${viewPath}`);
    const newPath = newView.viewPath;

    //set view
    await View(newPath);
  }
});
