import { Router } from "../core/Router.mjs";

async function app() {
  const viewPath = window.location.pathname.slice(1);
  debugger;
  await Router(viewPath);
}

app();
