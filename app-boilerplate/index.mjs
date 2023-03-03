import {Router, route} from "../core/Router.mjs";
import {Controller} from "./helpers/Controller.mjs";

export const router = new Router([
    route("", Controller)
])

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path)

