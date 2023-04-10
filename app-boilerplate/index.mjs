import { Router } from "../core/Router.mjs";

async function app() {
  const viewPath = window.location.pathname.slice(1);
  await Router(viewPath);
}

app();
