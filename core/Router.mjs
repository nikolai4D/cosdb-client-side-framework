import { View } from "./View.mjs";

export async function Router(viewPath) {
  await View(viewPath);
}

// Listen for back or forward navigation
window.addEventListener("popstate", async (event) => {
  if (event.state && event.state.viewPath) {
    const viewPath = event.state.viewPath;
    // Call View with updateHistory set to false
    await View(viewPath, false);
  }
});
