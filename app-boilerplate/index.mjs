import { Router } from "../core/Router.mjs";

async function app() {
  const path = window.location.pathname.slice(1);
  await new Router(path);
}

app();
