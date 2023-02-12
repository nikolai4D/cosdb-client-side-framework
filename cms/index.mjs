// import { handleLoad } from "./functions/handleLoad.mjs";

// window.onload = handleLoad;

import { Router, route } from "../core/Router.mjs";

export const router = new Router([route("cms", Start_Controller)]);

const path = window.location.pathname.slice(1);
console.log("path: ", path);

router.goTo(path);
