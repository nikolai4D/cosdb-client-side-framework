import { Router } from "../../core/Router.mjs";

export async function action_routeToView(viewPath) {
  return await Router(viewPath);
}
