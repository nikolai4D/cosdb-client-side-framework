// import { View } from "./View.mjs";

// export async function Router(viewPath) {
//   await View(viewPath);
// }
// // Listen for back or forward navigation
// window.addEventListener("popstate", async (event) => {
//   if (event.state && event.state.viewPath) {
//     const viewPath = event.state.viewPath;
//     await View(viewPath);
//   }
// });

import { View } from "./View.mjs";

export async function Router(viewPath) {
  await View(viewPath);
}

// Listen for back or forward navigation
window.addEventListener("popstate", async (event) => {
  if (event.state && event.state.viewPath) {
    const viewPath = event.state.viewPath;
    // Replace the current history entry instead of pushing a new one
    window.history.replaceState({ viewPath: viewPath }, "", viewPath);
    await View(viewPath);
  }
});
