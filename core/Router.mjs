import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
import { View } from "./View.mjs";

export async function Router(viewPath) {
  //validate and authenticate path
  const newView = await apiCallGet(`/auth/${viewPath}`);
  console.log("newView", newView);

  //set browser history
  window.history.pushState({ viewPath: newView.value }, "", newView.value);

  //set view
  await View(newView);
}

// Listen for back or forward navigation
window.addEventListener("popstate", async (event) => {
  if (event.state && event.state.viewPath) {
    const viewPath = event.state.viewPath;

    //validate and authenticate path
    const newView = await apiCallGet(`/auth/${viewPath}`);

    //set view
    await View(newView);
  }
});
